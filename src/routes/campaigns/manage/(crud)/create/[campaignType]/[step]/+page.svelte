<script lang="ts">
	import { beforeUpdate, getContext } from 'svelte';
	import { airDropCampaignCreationConfig } from '$lib/features';
	import { type IStepBarStore } from '$lib/types';

	export let data;

	const { currentStep, setCurrentStep } = getContext<IStepBarStore>('stepBarStore');

	beforeUpdate(() => {
		setCurrentStep(+data.currentStep);
	});

	const stepComponents = [...airDropCampaignCreationConfig.steps];
</script>

{#each [stepComponents[$currentStep - 1]] as Step}
	<svelte:component this={Step} />
{/each}
