<script lang="ts">
	import moment from 'moment/moment.js';
	import { Button, Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import { type ITimeLineItemProps, ETimeLineItem } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	export const iconStatus: ITimeLineItemProps['iconStatus'] = ETimeLineItem.CHECKED;
	export let title: ITimeLineItemProps['title'];
	export let description: ITimeLineItemProps['description'];
	export let date: ITimeLineItemProps['date'];
	export let status: ITimeLineItemProps['status'];
	export let isFirst: ITimeLineItemProps['isFirst'];
	export let isLast: ITimeLineItemProps['isLast'];
	export let onButtonClick: ITimeLineItemProps['onButtonClick'];
	export let buttonLabel: ITimeLineItemProps['buttonLabel'];
	export let numericPhase: ITimeLineItemProps['numericPhase'];
	export let isTimelineOpen: ITimeLineItemProps['isTimelineOpen'] = false;

	const getStatusColor: (status: ITimeLineItemProps['status']) => string = (status) => {
		switch (status) {
			case 'passed':
				return 'var(--upOnly)';
			case 'ongoing':
				return 'var(--purpleCow)';
			case 'rejected':
				return 'var(--rugged)';
			default:
				return 'var(--foreground)';
		}
	};

	const isLowOpacityBefore = status === 'ongoing';
	const isLowOpacityAfter = status === 'planned' || status === 'ongoing';
</script>

<div class="flex flex-row h-fit gap-5 timeline-item {status} {isTimelineOpen ? 'open' : ''}">
	<div
		class="flex justify-center items-center w-[40px] relative {isTimelineOpen
			? 'open'
			: ''} {isFirst ? 'isFirst' : ''} {isLast ? 'isLast' : ''} {isLowOpacityBefore
			? 'low-opacity-before'
			: ''} {isLowOpacityAfter ? 'low-opacity-after' : ''}"
	>
		<div
			class="icon-container {isTimelineOpen ? 'open' : ''} {isFirst ? 'isFirst' : ''} {isLast
				? 'isLast'
				: ''}"
		>
			{#if status === 'passed'}
				<CheckmarkCircleIcon fill="var(--upOnly)" />
			{:else}
				<div class="circle-container {status} ">
					<div class="numbered-circle">{numericPhase}</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex justify-start items-center w-full">
		<div class="flex flex-col">
			<Typography variant="h6" color={getStatusColor(status)}>{title}</Typography>
			<div class="description-container">
				<Typography variant="caption" color="var(--foreground)">
					{description}
				</Typography>
			</div>
		</div>
	</div>
	{#if onButtonClick}
		<div class="flex flex-col justify-center items-end w-4/12">
			<Button on:click={onButtonClick}>{buttonLabel}</Button>
		</div>
	{:else if status === 'to-do'}
		<div class="flex flex-col justify-center items-end w-4/12">
			<Typography variant="caption" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{:else if date && status}
		<div class="flex flex-col items-end justify-b w-[140px] px-2">
			<div class="flex">
				<Typography variant="cardDate" class="text-right text-nowrap"
					>{moment(date.toLocaleString()).format('MMM D, YYYY')}</Typography
				>
			</div>
			<Typography variant="cardDate" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{/if}
</div>

<style lang="less">
	.low-opacity {
		&::before,
		&::after {
			opacity: 0.6;
		}
	}
	.icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		&.open {
			&::before,
			&::after {
				content: '';
				position: absolute;
				width: 2px;
				height: 20px;
				background-color: rgb(78, 78, 78);
			}
			&::before {
				height: 50% - 18px;
				top: -6px;
				visibility: visible;
			}
			&::after {
				height: 50% - 18px;
				bottom: -6px;
				visibility: visible;
			}
		}
		&.isFirst {
			&.open::before {
				visibility: hidden;
			}
		}
		&.isLast {
			&.open::after {
				visibility: hidden;
			}
		}
		&.isFirst {
			&.open::before {
				visibility: hidden;
			}
		}
		&.isLast {
			&.open::after {
				visibility: hidden;
			}
		}
	}
	.circle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--foreground);
		padding: 4px;
		border-radius: 50%;
		opacity: 0.6;
		background-color: var(--foreground);
	}
	.numbered-circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background-color: black;
		border-radius: 50%;
		color: white;
		font-weight: bold;
	}

	.timeline-item {
		border-radius: 4px;
		position: relative;
		padding-top: 10px;
		padding-bottom: 10px;

		&.open {
			&.passed,
			&.planned {
				opacity: 0.6;
			}
		}

		&.passed {
			.circle-container {
				background-color: var(--upOnly);
				opacity: 1;
			}
			.numbered-circle {
				background-color: var(--upOnly);
			}
		}
		&.ongoing {
			color: var(--purpleCow);
			.circle-container {
				background-color: var(--purpleCow);
				opacity: 1;
			}
			.numbered-circle {
				color: var(--purpleCow);
			}
		}
		&.planned {
			color: var(--foreground);

			.circle-container {
				background-color: var(--foreground);
			}
		}
		&.rejected {
			color: var(--rugged);
			.circle-container {
				background-color: var(--rugged);
				opacity: 1;
			}
			.numbered-circle {
				color: var(--rugged);
			}
		}
	}
</style>
