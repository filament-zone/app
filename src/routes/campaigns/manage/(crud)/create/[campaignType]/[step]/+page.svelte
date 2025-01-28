<script lang="ts">
	import { beforeUpdate, getContext, onDestroy } from 'svelte';
	import { airDropCampaignCreationConfig, campaignStore } from '$lib/features';
	import { type IStepBarStore } from '$lib/types';

	export let data;

	const { currentStep, setCurrentStep } = getContext<IStepBarStore>('stepBarStore');
	const { clearCampaignDetails } = campaignStore;

	beforeUpdate(() => {
		setCurrentStep(+data.currentStep);
	});

	const stepComponents = [...airDropCampaignCreationConfig.steps];

	onDestroy(() => {
		clearCampaignDetails();
	});
</script>

{#each [stepComponents[$currentStep - 1]] as Step}
	<svelte:component this={Step} />
{/each}
