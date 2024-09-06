<script lang="ts">
	import { getContext } from 'svelte';
	import {
		CampaignAirDropStep1,
		CampaignAirDropStep2,
		CampaignAirDropStep3,
		CampaignAirDropStep4
	} from '$lib/features';
	import { type IStepBarStore } from '$lib/types';

	const { currentStep } = getContext<IStepBarStore>('stepBarStore');

	const stepComponents = [
		CampaignAirDropStep1,
		CampaignAirDropStep2,
		CampaignAirDropStep3,
		CampaignAirDropStep4
	];
</script>

{#each [stepComponents[$currentStep - 1]] as Step}
	<svelte:component this={Step} />
{/each}
