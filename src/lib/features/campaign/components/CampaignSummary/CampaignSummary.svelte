<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle, Container, Typography, CampaignTimeLine } from '$lib/components';
	import CampaignSummaryDescription from './CampaignSummaryDescription.svelte';
	import CampaignSummaryCriteria from './CampaignSummaryCriteria.svelte';
	import CampaignSummaryDelegates from './CampaignSummaryDelegates.svelte';
	import { EToggleVariant, type ICampaignSummaryProps, type IToggleProps } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg?url';

	export let campaign: ICampaignSummaryProps['campaign'];
	export let useTimeline: ICampaignSummaryProps['useTimeLine'] = false;

	let toggleOptions: IToggleProps<string>['options'] = [
		{ value: 'criteria', label: 'Criteria' },
		{ value: 'governance', label: 'Delegates' }
	];

	let toggleValue = '';
	onMount(() => {
		if (campaign.phase)
			if (toggleOptions?.length) {
				toggleValue = toggleOptions?.[0].value;
			}
	});
</script>

<div class="flex flex-col gap-5 w-full">
	<Container variant="inner-container">
		<div class="flex flex-col gap-6">
			<div class="flex gap-6 items-center">
				<div class="bg-foreground w-10 h-10 rounded-full flex items-center justify-center">
					{#if campaign?.title}
						<h5 class="text-darkNet font-bold">{campaign?.title.slice(0, 1)}</h5>
					{:else}
						<img
							src={LogoFilament}
							alt="logo"
							class="w-6"
							style="filter: invert(1) sepia(1) saturate(5) hue-rotate(180deg);"
						/>
					{/if}
				</div>
				<Typography variant="h4">{campaign?.title || 'Campaign Title'}</Typography>
			</div>
			{#if useTimeline}
				<CampaignTimeLine {campaign} />
			{/if}
			<CampaignSummaryDescription {campaign} />
		</div>
	</Container>

	<div class="flex flex-col w-full">
		<Toggle options={toggleOptions} variant={EToggleVariant.SECONDARY} bind:value={toggleValue} />
		<Container variant="inner-container">
			{#if toggleValue === 'criteria'}
				<CampaignSummaryCriteria {campaign} />
			{:else if toggleValue === 'governance'}
				<CampaignSummaryDelegates />
			{/if}
		</Container>
	</div>
</div>
