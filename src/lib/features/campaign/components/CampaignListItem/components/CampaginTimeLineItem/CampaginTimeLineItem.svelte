<script lang="ts">
	import moment from 'moment/moment.js';
	import { Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import { type ICampaignTimeLineItemProps, ECampaignTimeLineItem } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import ProcessingCircleIcon from '$lib/assets/icons/processing-circle.svg?component';

	export let iconStatus: ICampaignTimeLineItemProps['iconStatus'];
	export let title: ICampaignTimeLineItemProps['title'];
	export let description: ICampaignTimeLineItemProps['description'];
	export let date: ICampaignTimeLineItemProps['date'];
	export let status: ICampaignTimeLineItemProps['status'];

	const getStatusColor: (status: ICampaignTimeLineItemProps['status']) => string = (status) => {
		switch (status) {
			case 'success':
				return 'var(--green-100)';
			case 'processing':
				return 'var(--purple-100)';
			default:
				return 'var(--gray-200)';
		}
	};
</script>

<div class="flex flex-row h-[72px]">
	<div class="flex justify-center items-center w-1/12">
		{#if iconStatus === ECampaignTimeLineItem.CHECKED}
			<CheckmarkCircleIcon fill="var(--green-100)" />
		{:else if iconStatus === ECampaignTimeLineItem.PROCESSING}
			<ProcessingCircleIcon />
		{/if}
	</div>
	<div class="flex justify-start items-center w-8/12">
		<div class="flex flex-col">
			<Typography variant="caption">{title}</Typography>
			<Typography variant="caption" color="var(--gray-200)">
				{description}</Typography
			>
		</div>
	</div>
	<div class="flex flex-col justify-center items-end w-3/12">
		{#if date}
			<Typography variant="caption">{moment(date).format('MMMM D, YYYY')}</Typography>
		{/if}
		<Typography variant="caption" color={getStatusColor(status)}
			>{capitalizeFirstLetter(status)}</Typography
		>
	</div>
</div>
