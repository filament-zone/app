<script lang="ts">
	import { run } from 'svelte/legacy';

	import moment, { type Moment } from 'moment';
	import { DaysRow, Input, Typography, Calendar, Label, Button } from '$lib/components';
	import { clickOutside } from '$lib/actions';
	import {
		CalendarMode,
		type ICalendarProps,
		type IDatePickerProps,
		EInputSizeVariant,
		EButtonSizeVariant,
		EButtonStyleVariant
	} from '$lib/types';
	import CloseIcon from '$lib/assets/icons/close_24px.svg?component';
	import CalendarIcon from '$lib/assets/icons/calendar-1.svg?component';

	interface Props {
		value: IDatePickerProps<CalendarMode.SINGLE>['value'];
		onChange?: IDatePickerProps<CalendarMode.SINGLE>['onChange'];
		label?: IDatePickerProps<CalendarMode.SINGLE>['label'];
		inputLabel?: IDatePickerProps<CalendarMode.SINGLE>['inputLabel'];
		position?: IDatePickerProps<CalendarMode.SINGLE>['position'];
		closeOnClickOutside?: IDatePickerProps<CalendarMode.SINGLE>['closeOnClickOutside'];
		disabled?: IDatePickerProps<CalendarMode.SINGLE>['disabled'];
	}

	let {
		value,
		onChange = null,
		label = '',
		inputLabel = '',
		position = '',
		closeOnClickOutside = false,
		disabled = false
	}: Props = $props();

	let initialDate = $derived((value?.date ? moment(value.date) : '') as Moment);
	let localDate;
	run(() => {
		localDate = { date: initialDate ? initialDate?.toISOString() : '' } as { date: string | null };
	});

	let isPopoverOpen = $state(false);

	const handleOpenPopover = () => {
		isPopoverOpen = true;
	};

	const handleChangeDate: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		localDate = value;
	};

	let dateLabel = $derived(`${localDate.date ? moment(localDate.date).format('MMM DD YYYY') : ''}`);

	let monthsToRender: moment.Moment[] = $state([]);
	run(() => {
		let currentMonth = moment().month(); // 0-11
		let currentYear = moment().year();
		if (monthsToRender.length === 0) {
			for (let month = currentMonth; month < 12; month++) {
				monthsToRender.push(moment([currentYear, month, 1]));
			}
		}
	});

	const addNextYearMonths = () => {
		const lastMonthInArray = monthsToRender[monthsToRender.length - 1];
		const nextYear = lastMonthInArray.clone().add(1, 'year').year();

		const newMonths = [];
		for (let month = 0; month < 12; month++) {
			newMonths.push(moment([nextYear, month, 1]));
		}

		monthsToRender = monthsToRender.concat(newMonths);
	};

	const handleCancel = () => {
		isPopoverOpen = false;
		localDate = { date: initialDate.toISOString() };
	};

	const handleClosePopover = () => {
		isPopoverOpen = false;
		handleCancel();
	};

	const handleSave = () => {
		isPopoverOpen = false;
		if (onChange) {
			onChange(localDate);
		}
	};

	let calendarContainer: HTMLElement = $state();

	const handleScroll = () => {
		if (calendarContainer) {
			const { scrollTop, scrollHeight, clientHeight } = calendarContainer;

			const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

			if (isAtBottom) {
				addNextYearMonths();
			}
		}
	};
</script>

<div class="relative">
	{#if label}
		<Label value={label} />
	{/if}
	<div class="flex flex-row gap-4 relative dropdown-container">
		<div class="flex flex-row gap-4 items-center justify-between w-full">
			{#if inputLabel}
				<span class="input-label">{inputLabel}</span>
			{/if}
			<Input
				sizeVariant={EInputSizeVariant.FULL_WIDTH}
				on:click={() => {
					if (!disabled) {
						handleOpenPopover();
					}
				}}
				value={initialDate ? initialDate.format('MM / DD / YYYY') : ''}
				placeholder="Date"
				RightIcon={CalendarIcon}
				{disabled}
			/>
		</div>
	</div>
	{#if isPopoverOpen}
		<div
			class="popover-container ml-auto absolute z-10"
			style={`${position === 'left' ? 'left: -32px;' : ''}; top: 50px`}
			use:clickOutside
			onclickOutside={() => {
				if (closeOnClickOutside) {
					handleClosePopover();
				}
			}}
		>
			<div class="p-2 h-[122px]">
				<button onclick={handleClosePopover}>
					<CloseIcon />
				</button>
				<div class="mx-12 mb-4 flex flex-col gap-2">
					<Typography variant="caption" color="white">Date</Typography>
					<Typography variant="h6" color="white">{dateLabel}</Typography>
				</div>
			</div>
			<div class="border-t-2 border-white p-2 h-[410px] overflow-x-hidden calendar-container">
				<DaysRow />
				<div
					class="overflow-y-scroll overflow-x-hidden max-h-[300px]"
					bind:this={calendarContainer}
					onscroll={handleScroll}
				>
					{#each monthsToRender as month}
						<Calendar
							onChange={handleChangeDate}
							value={localDate}
							monthToRender={month}
							mode={CalendarMode.SINGLE}
						/>
					{/each}
				</div>
				<div class="flex flex-row gap-2 mt-2">
					<Button
						sizeVariant={EButtonSizeVariant.FULL_WIDTH}
						styleVariant={EButtonStyleVariant.NEGATIVE}
						on:click={handleCancel}
						class="cursor-pointer">Cancel</Button
					>
					<Button
						sizeVariant={EButtonSizeVariant.FULL_WIDTH}
						styleVariant={EButtonStyleVariant.POSITIVE}
						on:click={handleSave}
						class="cursor-pointer">Save</Button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="less">
	.popover-container {
		border: 0.2px solid #303030;
		background-color: black;
		width: 340px;
	}

	.input-label {
		color: rgba(255, 255, 255, 0.5);
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 13px;
		width: 50px;
	}

	.calendar-container::-webkit-scrollbar {
		display: none;
	}
</style>
