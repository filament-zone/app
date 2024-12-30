<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle } from '$lib/components';
	import CampaignSummaryDescription from './CampaignSummaryDescription.svelte';
	import CampaignSummaryCriteria from './CampaignSummaryCriteria.svelte';
	import CampaignSummaryDelegates from './CampaignSummaryDelegates.svelte';
	import CampaignSummaryVotes from './CampaignSummaryVotes.svelte';
	import CampaignSummaryDistribution from './CampaignSummaryDistribution.svelte';
	import { EToggleVariant, type ICampaignSummaryProps, type IToggleProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	let toggleOptions: IToggleProps<string>['options'] = [
		{ value: 'description', label: 'Description' },
		{ value: 'criteria', label: 'Criteria' },
		{ value: 'governance', label: 'Delegates' },
		{ value: 'votes', label: 'Votes' }
	];

	let toggleValue = '';
	onMount(() => {
		if (campaign.phase)
			if (toggleOptions?.length) {
				if (!toggleOptions.find((option) => option.value === 'distribution')) {
					toggleOptions = [{ value: 'distribution', label: 'Distribution' }, ...toggleOptions];
					toggleValue = toggleOptions?.[0].value;
				}
			}
	});
</script>

<div class="flex flex-col gap-5 w-full">
	<Toggle options={toggleOptions} variant={EToggleVariant.SECONDARY} bind:value={toggleValue} />
	{#if toggleValue === 'distribution'}
		<CampaignSummaryDistribution />
	{:else if toggleValue === 'description'}
		<CampaignSummaryDescription {campaign} />
	{:else if toggleValue === 'criteria'}
		<CampaignSummaryCriteria {campaign} />
	{:else if toggleValue === 'governance'}
		<CampaignSummaryDelegates />
	{:else if toggleValue === 'votes'}
		<CampaignSummaryVotes />
	{/if}
</div>
