<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { Dots, StepBarCampaignButton } from '$lib/features';
	import { eventListener } from '$lib/helpers';
	import { type IStepBarProps, type IStepBarStore } from '$lib/types';

	export let contextId: IStepBarProps['contextId'] = 'stepBarStore';
	const data = derived(page, () => $page.data);

	const { steps } = getContext<IStepBarStore>(contextId);
	const getColor = (step: number) => ($data.currentStep > step ? '#21F879' : '#A8A8A8');

	let gaps: number[] | null = [];
	let container: HTMLDivElement;

	const calculateDotsCount = (gap: number) => Math.floor(gap / 24);

	const updateGaps = () => {
		const stepButtons = container.querySelectorAll('.step-button');
		let newGaps = [];
		for (let i = 0; i < stepButtons.length - 1; i++) {
			const button1 = stepButtons[i].getBoundingClientRect();
			const button2 = stepButtons[i + 1].getBoundingClientRect();
			const gap = button2.left - (button1.left + button1.width);
			newGaps.push(calculateDotsCount(gap));
		}

		gaps = [...newGaps];
	};

	onMount(() => {
		updateGaps();
	});

	eventListener('resize', () => {
		gaps = null;
	});

	eventListener('resize', () => {
		updateGaps();
	});
</script>

<div class="flex w-full justify-center">
	<div
		class="step-indicator-navigation flex flex-1 flex-row items-center gap-8 py-4 max-w-[1440px]"
		bind:this={container}
	>
		<div class="flex flex-row justify-between items-center w-full">
			{#each $steps as step, index}
				<div class="flex flex-row step-button">
					<StepBarCampaignButton {step} />
				</div>
				{#if index < $steps.length - 1}
					<div class="mx-2 flex flex-row justify-between flex-grow dots-wrapper">
						<div class="dots-container flex flex-row justify-between">
							{#if gaps?.length}
								<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
								{#each Array(gaps[index] || 0) as _}
									<Dots color={getColor(step.value)} />
								{/each}
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.dots-container {
		gap: 8px;
	}

	.dots-wrapper {
		width: 100%;
	}
</style>
