<script lang="ts">
	import moment from 'moment/moment.js';
	import { Button, Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import ProcessingCircleIcon from '$lib/assets/icons/processing-circle.svg?component';
	import { type ICampaignTimeLineItemProps } from '$lib/types';
	import { ECampaignTimeLineItem } from '$lib/features/campaign/components/CampaignListItem/components/CampaginTimeLineItem/CampaignTimeLineItem.enums';

	export let iconStatus: ICampaignTimeLineItemProps['iconStatus'];
	export let title: ICampaignTimeLineItemProps['title'];
	export let description: ICampaignTimeLineItemProps['description'];
	export let date: ICampaignTimeLineItemProps['date'];
	export let status: ICampaignTimeLineItemProps['status'];
	export let isFirst: ICampaignTimeLineItemProps['isFirst'] = false;
	export let isLast: ICampaignTimeLineItemProps['isLast'] = false;
	export let onButtonClick: ICampaignTimeLineItemProps['onButtonClick'];
	export let buttonLabel: ICampaignTimeLineItemProps['buttonLabel'];

	const getStatusColor: (status: ICampaignTimeLineItemProps['status']) => string = (status) => {
		switch (status) {
			case 'success':
				return 'var(--upOnly-400)';
			case 'processing':
				return 'var(--purpleCow-500)';
			default:
				return 'var(--gray-200)';
		}
	};

	$: lineBackground = iconStatus === ECampaignTimeLineItem.CHECKED ? '#4D4D4D' : '#272727';

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
		{#if iconStatus === ECampaignTimeLineItem.CHECKED}
			{#if renderLine('top')}
				<div style={renderLine('top')} />
			{/if}
			<CheckmarkCircleIcon fill="var(--upOnly-400)" />
			{#if renderLine('bottom')}
				<div style={renderLine('bottom')} />
			{/if}
		{:else if iconStatus === ECampaignTimeLineItem.PROCESSING}
			{#if renderLine('top')}
				<div style={renderLine('top')} />
			{/if}
			<ProcessingCircleIcon />
			{#if renderLine('bottom')}
				<div style={renderLine('bottom')} />
			{/if}
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
	<div class="flex flex-col justify-center items-end w-4/12">
		{#if onButtonClick}
			<Button on:click={onButtonClick}>{buttonLabel}</Button>
		{:else if status === 'to-do'}
			<Typography variant="caption" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		{:else}
			<Typography variant="caption" class="text-right"
				>{moment(date).format('MMMM D, YYYY')}</Typography
			>
			<Typography variant="caption" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		{/if}
	</div>
</div>
