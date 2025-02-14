<script lang="ts">
	import moment from 'moment/moment.js';
	import { Button, Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import ProcessingCircleIcon from '$lib/assets/icons/processing-circle.svg?component';
	import { MinusCircleIcon } from 'svelte-feather-icons';
	import { type ITxTimeLineItemProps, ETxTimeLineItem } from '$lib/types';

	export let iconStatus: ITxTimeLineItemProps['iconStatus'];
	export let title: ITxTimeLineItemProps['title'];
	export let description: ITxTimeLineItemProps['description'];
	export let date: ITxTimeLineItemProps['date'];
	export let status: ITxTimeLineItemProps['status'];
	export let isFirst: ITxTimeLineItemProps['isFirst'] = false;
	export let isLast: ITxTimeLineItemProps['isLast'] = false;
	export let onButtonClick: ITxTimeLineItemProps['onButtonClick'];
	export let buttonLabel: ITxTimeLineItemProps['buttonLabel'];

	const getStatusColor: (status: ITxTimeLineItemProps['status']) => string = (status) => {
		switch (status) {
			case 'success':
				return 'var(--upOnly-400)';
			case 'processing':
				return 'var(--purpleCow-500)';
			case 'ongoing':
				return 'var(--purpleCow-500)';
			default:
				return 'var(--gray-200)';
		}
	};

	$: lineBackground = iconStatus === ETxTimeLineItem.CHECKED ? '#4D4D4D' : '#272727';

	const renderLine = (position: 'top' | 'bottom') => {
		if ((position === 'top' && !isLast) || (position === 'bottom' && !isFirst)) {
			return `
				position: absolute;
				${position}: 0;
				left: 50%;
				width: 1px;
				background-color: ${lineBackground};
				height: 25px;
			`;
		}
		return null;
	};
</script>

<div class="flex flex-row h-[72px]">
	<div class="flex justify-center items-center w-1/12 relative">
		{#if iconStatus === ETxTimeLineItem.CHECKED}
			{#if renderLine('top')}
				<div style={renderLine('top')} />
			{/if}
			<CheckmarkCircleIcon fill="var(--upOnly-400)" />
			{#if renderLine('bottom')}
				<div style={renderLine('bottom')} />
			{/if}
		{:else if iconStatus === ETxTimeLineItem.PROCESSING}
			{#if renderLine('top')}
				<div style={renderLine('top')} />
			{/if}
			<ProcessingCircleIcon />
			{#if renderLine('bottom')}
				<div style={renderLine('bottom')} />
			{/if}
		{:else if iconStatus === ETxTimeLineItem.FAILED}
			<MinusCircleIcon class="text-rugged" />
		{/if}
	</div>
	<div class="flex justify-start items-center w-8/12">
		<div class="flex flex-col">
			<Typography variant="h6">{title}</Typography>
			<Typography variant="caption" color="var(--gray-200)">
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
		<div class="flex flex-col justify-center items-end w-4/12">
			<Typography variant="caption" class="text-right"
				>{moment(date.toLocaleString()).format('MMMM D, YYYY')}</Typography
			>
			<Typography variant="caption" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{/if}
</div>
