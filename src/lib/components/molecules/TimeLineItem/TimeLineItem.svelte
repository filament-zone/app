<script lang="ts">
	import moment from 'moment/moment.js';
	import { Button, Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import { type ITimeLineItemProps, ETimeLineItem } from '$lib/types';

	export const iconStatus: ITimeLineItemProps['iconStatus'] = ETimeLineItem.CHECKED;
	export let title: ITimeLineItemProps['title'];
	export let description: ITimeLineItemProps['description'];
	export let date: ITimeLineItemProps['date'];
	export let status: ITimeLineItemProps['status'];
	export const isFirst: ITimeLineItemProps['isFirst'] = false;
	export const isLast: ITimeLineItemProps['isLast'] = false;
	export let phase: string;
	export let isTimelineOpen: boolean = true;
	export let onButtonClick: ITimeLineItemProps['onButtonClick'];
	export let buttonLabel: ITimeLineItemProps['buttonLabel'];

	const getStatusColor: (status: ITimeLineItemProps['status']) => string = (status) => {
		switch (status) {
			case 'success':
				return 'var(--upOnly)';
			case 'processing':
				return 'var(--purpleCow)';
			case 'ongoing':
				return 'var(--purpleCow)';
			default:
				return 'var(--gray-200)';
		}
	};

	console.log('isTimelineOpen', isTimelineOpen);
</script>

<div class="flex flex-row h-fit gap-4 timeline-item">
	<div class="flex justify-center items-center w-[40px] relative">
		<div class="numbered-circle">{parseInt(phase)}</div>
	</div>
	<div class="flex justify-start items-center w-full">
		<div class="flex flex-col">
			<Typography variant="h6" color="var(--purpleCow)">{title}</Typography>
			<Typography variant="caption" color="var(--foreground)">
				{description}
			</Typography>
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
		<div class="flex flex-col items-end w-4/12 max-w-[140px] px-2 justify-between py-2">
			<Typography variant="cardDate" class="text-right"
				>{moment(date.toLocaleString()).format('MMMM D, YYYY')}</Typography
			>
			<Typography variant="cardDate" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{/if}
</div>

<style lang="scss">
	.numbered-circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background-color: black;
		border: 2px solid var(--gray-200);
		border-radius: 50%;
		color: white;
		font-weight: bold;
	}

	.timeline-item {
		padding: 4px;
		border-radius: 4px;
		/* 
		&.completed {
			border: 1px solid var(--upOnly);
		}

		&.active {
			border: 1px solid var(--purpleCow);

			.numbered-circle {
				background-color: var(--purpleCow);
			}
		} */
	}
</style>
