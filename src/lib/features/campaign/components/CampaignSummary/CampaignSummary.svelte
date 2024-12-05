<script lang="ts">
	import { Toggle } from '$lib/components';
	import CampaignSummaryDescription from './CampaignSummaryDescription.svelte';
	import CampaignSummaryCriteria from './CampaignSummaryCriteria.svelte';
	import CampaignSummaryDelegates from './CampaignSummaryDelegates.svelte';
	import CampaignSummaryVotes from './CampaignSummaryVotes.svelte';
	import { EToggleVariant, type ICampaignSummaryProps, type IToggleProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	const toggleOptions: IToggleProps<string>['options'] = [
		{ value: 'description', label: 'Description' },
		{ value: 'criteria', label: 'Criteria' },
		{ value: 'governance', label: 'Delegates' },
		{ value: 'votes', label: 'Votes' }
	];

	$: toggleValue = toggleOptions[0].value;
</script>

<div class="flex flex-col gap-5 w-full">
	<Toggle options={toggleOptions} variant={EToggleVariant.SECONDARY} bind:value={toggleValue} />
	{#if toggleValue === 'description'}
		<CampaignSummaryDescription {campaign} />
	{:else if toggleValue === 'criteria'}
		<CampaignSummaryCriteria {campaign} />
	{:else if toggleValue === 'governance'}
		<CampaignSummaryDelegates {campaign} />
	{:else if toggleValue === 'votes'}
		<CampaignSummaryVotes />
	{/if}
</div>
