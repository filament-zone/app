<script lang="ts">
	import moment from 'moment';
	import { DaysRow, Typography } from '$lib/components';
	import { months } from '$lib/constants';
	import { CalendarMode, type ICalendarProps } from '$lib/types';

	let {
		mode,
		value,
		onChange,
		displayDayOfWeek = false,
		monthToRender
	}: ICalendarProps<CalendarMode.SINGLE> = $props();

	let today = moment();
	let currentMonth = monthToRender.month();
	let currentYear = monthToRender.year();

	const getDaysInMonth = () => {
		return monthToRender.daysInMonth();
	};

	const getStartDayOfMonth = () => {
		return monthToRender.startOf('month').day();
	};

	let daysInMonth = getDaysInMonth();
	let startDay = getStartDayOfMonth();

	let daysArray: number[] = [];
	for (let i = 1; i <= daysInMonth; i++) {
		daysArray.push(i);
	}

	const handleChange = (day: number) => {
		const selectedDate = moment([currentYear, currentMonth, day]).toISOString();

		if (!onChange) return;

		if (mode === CalendarMode.SINGLE) {
			onChange({ date: selectedDate });
		} else if (mode === CalendarMode.RANGED) {
			let newStart = (value as ICalendarProps<CalendarMode.RANGED>['value']).start;
			let newEnd = (value as ICalendarProps<CalendarMode.RANGED>['value']).end;

			if (typeof value === 'object' && value !== null) {
				if (
					!(value as ICalendarProps<CalendarMode.RANGED>['value']).start ||
					((value as ICalendarProps<CalendarMode.RANGED>['value']).start &&
						(value as ICalendarProps<CalendarMode.RANGED>['value']).end)
				) {
					newStart = selectedDate;
					newEnd = null;
				} else if (
					(value as ICalendarProps<CalendarMode.RANGED>['value']).start &&
					!(value as ICalendarProps<CalendarMode.RANGED>['value']).end
				) {
					if (
						moment(selectedDate).isBefore(
							moment((value as ICalendarProps<CalendarMode.RANGED>['value']).start)
						)
					) {
						newStart = selectedDate;
					} else {
						newEnd = selectedDate;
					}
				}
				onChange({ start: newStart, end: newEnd });
			}
		}
	};

	let isCurrentDay = $derived((day: number) => {
		return today.date() === day && today.month() === currentMonth && today.year() === currentYear
			? 'current-day'
			: '';
	});

	let isSelectedDay = $derived((day: number) => {
		if (mode === CalendarMode.SINGLE && value) {
			return moment((value as ICalendarProps<CalendarMode.SINGLE>['value']).date).date() === day &&
				moment((value as ICalendarProps<CalendarMode.SINGLE>['value']).date).month() ===
					currentMonth &&
				moment((value as ICalendarProps<CalendarMode.SINGLE>['value']).date).year() === currentYear
				? 'selected-day'
				: '';
		}
		return '';
	});

	let isFirstDay = $derived(() =>
		// day: number
		{
			// if (
			// 	mode === CalendarMode.RANGED &&
			// 	(value as ICalendarProps<CalendarMode.RANGED>['value']).start
			// ) {
			// 	return moment((value as ICalendarProps<CalendarMode.RANGED>['value']).start).date() === day &&
			// 		moment((value as ICalendarProps<CalendarMode.RANGED>['value']).start).month() ===
			// 			currentMonth &&
			// 		moment((value as ICalendarProps<CalendarMode.RANGED>['value']).start).year() === currentYear
			// 		? 'selected-day first-day'
			// 		: '';
			// }
			return '';
		}
	);

	let isLastDay = $derived(() =>
		// day: number
		{
			// if (
			// 	mode === CalendarMode.RANGED &&
			// 	(value as ICalendarProps<CalendarMode.RANGED>['value']).end
			// ) {
			// 	return moment((value as ICalendarProps<CalendarMode.RANGED>['value']).end).date() === day &&
			// 		moment((value as ICalendarProps<CalendarMode.RANGED>['value']).end).month() ===
			// 			currentMonth &&
			// 		moment((value as ICalendarProps<CalendarMode.RANGED>['value']).end).year() === currentYear
			// 		? 'selected-day last-day'
			// 		: '';
			// }
			return '';
		}
	);

	let isInsideRange = $derived(() =>
		// day: number
		{
			// if (
			// 	mode === 'ranged' &&
			// 	(value as ICalendarProps<CalendarMode.RANGED>['value']).start &&
			// 	(value as ICalendarProps<CalendarMode.RANGED>['value']).end
			// ) {
			// 	const currentDayMoment = moment([currentYear, currentMonth, day]);
			// 	return currentDayMoment.isAfter(
			// 		moment((value as ICalendarProps<CalendarMode.RANGED>['value']).start)
			// 	) &&
			// 		currentDayMoment.isBefore(
			// 			moment((value as ICalendarProps<CalendarMode.RANGED>['value']).end)
			// 		)
			// 		? 'inside-range'
			// 		: '';
			// }
			return '';
		}
	);

	let classNamesString = $derived((day: number) => {
		if (mode === CalendarMode.SINGLE) {
			return `${isSelectedDay(day)} ${isCurrentDay(day)}`;
		}
		if (mode === CalendarMode.RANGED) {
			return `${isCurrentDay(day)} ${isFirstDay()} ${isLastDay()} ${isInsideRange()}`;
		}
	});
</script>

<div>
	<div class="px-6 py-4">
		<Typography variant="caption" color="white">{months[currentMonth]} {currentYear}</Typography>
	</div>
	<div class="calendar">
		{#if displayDayOfWeek}
			<DaysRow />
		{/if}
		{#each Array(startDay).fill('') as _}
			<div class="day" aria-hidden="true">{_}</div>
		{/each}
		{#each daysArray as day}
			<div
				class="day-container"
				onclick={() => handleChange(day)}
				onkeyup={(event) => (event.key === 'Enter' || event.key === 'Space') && handleChange(day)}
				aria-label={`Calendar day: ${day}`}
				role="button"
				tabindex="0"
				aria-pressed="false"
			>
				<div class={`day ${classNamesString(day)}`}>
					<Typography
						variant="caption"
						color={classNamesString(day)?.includes('selected-day') ? '' : 'var(--white)'}
						>{day}</Typography
					>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="less">
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.day-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 46px;
		position: relative;

		&:has(:global(.first-day)) {
			&:before {
				content: '';
				position: absolute;
				width: 50%;
				height: 37px;
				right: 0;
				background-color: #1050fe;
			}
		}

		&:has(:global(.last-day)) {
			&:before {
				content: '';
				position: absolute;
				width: 50%;
				height: 37px;
				left: 0;
				background-color: #1050fe;
			}
		}

		&:has(:global(.inside-range)) {
			&:before {
				content: '';
				position: absolute;
				width: 100%;
				height: 37px;
				background-color: #1050fe;
			}
		}
	}

	.day {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 37px;
		width: 37px;
		cursor: pointer;
		color: white;
		z-index: 1;
	}

	.current-day {
		border: 0.5px solid var(--primary-white);
		border-radius: 50%;
		color: white !important;
	}

	.selected-day {
		background-color: white;
		border-radius: 50%;
		color: black !important;
		position: relative;
	}
</style>
