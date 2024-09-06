<script lang="ts">
	import { getContext } from 'svelte';
	import { Dots, StepBarCampaignButton } from '$lib/features';
	import type { IStepBarStore } from '$lib/types';

	const { steps, currentStep } = getContext<IStepBarStore>('stepBarStore');
	const getColor = (step: number) => ($currentStep > step ? '#21F879' : '#A8A8A8');
</script>

<div class="flex w-full justify-center">
	<div
		class="step-indicator-navigation flex mx-6 3xl:mx-0 flex-1 flex-row items-center gap-8 py-4 max-w-screen-2xl"
	>
		<div class="flex flex-row justify-between items-center w-full">
			{#each $steps as step, index}
				<div class="flex flex-row">
					<StepBarCampaignButton {step} />
				</div>
				{#if index < $steps.length - 2}
					<div class="mx-2 w-full flex flex-row justify-between">
						<Dots color={getColor(step.value)} />
						<Dots color={getColor(step.value)} />
						<Dots color={getColor(step.value)} />
						<Dots color={getColor(step.value)} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
