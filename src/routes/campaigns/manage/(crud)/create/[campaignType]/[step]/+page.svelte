<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { airDropCampaignCreationConfig, campaignStore } from '$lib/features';
	import { type IStepBarStore } from '$lib/types';

	let { data } = $props();

	const { currentStep, setCurrentStep } = getContext<IStepBarStore>('stepBarStore');
	const { clearCampaignDetails } = campaignStore;

	$effect.pre(() => {
		setCurrentStep(+data.currentStep);
	});

	const stepComponents = [...airDropCampaignCreationConfig.steps];

	onDestroy(() => {
		clearCampaignDetails();
	});
</script>

{#each [stepComponents[$currentStep - 1]] as Step}
	{#if Step}
		<Step />
	{/if}
{/each}
