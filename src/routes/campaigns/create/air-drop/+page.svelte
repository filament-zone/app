<script lang="ts">
	import { getContext } from 'svelte';
	import { airDropCampaignCreationConfig } from '$lib/features';
	import { type IStepBarStore } from '$lib/types';

	const { currentStep } = getContext<IStepBarStore>('stepBarStore');

	const stepComponents = [...airDropCampaignCreationConfig.steps];
</script>

{#each [stepComponents[$currentStep - 1]] as Step}
	<svelte:component this={Step} />
{/each}
