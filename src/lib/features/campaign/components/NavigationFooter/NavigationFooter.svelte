<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components';
	import { routes } from '$lib/constants';
	import { campaignStore } from '$lib/features';
	import { replaceUrlParams } from '$lib/helpers';
	import { EButtonStyleVariant, type INavigationFooterProps, type IStepBarStore } from '$lib/types';

	let { handleBack = () => {}, disabled = false }: INavigationFooterProps = $props();

	const { clearCampaignDetails, createCampaign } = campaignStore;
	const { currentStep, steps, isLastStep, isPreLastStep, validateCurrentStep } =
		getContext<IStepBarStore>('stepBarStore');

	let localHandleNext = $derived(async () => {
		if ($isLastStep) {
			await createCampaign();
			return;
		}
		const isValid = await validateCurrentStep();

		if (isValid) {
			await goto(
				replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
					campaignType: 'air-drop',
					step: ($currentStep + 1).toString()
				})
			);
		}
	});
</script>

<div class="flex w-full justify-center items-end mt-auto">
	<div class=" flex flex-row justify-between mt-auto flex-1 max-w-screen-2xl py-8">
		<div class="flex flex-row gap-2">
			{#if $currentStep > 1}
				<Button
					styleVariant={EButtonStyleVariant.SECONDARY}
					onclick={() => {
						if (handleBack) {
							handleBack();
						}
						if (page.route.id?.includes('create')) {
							goto(
								replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
									campaignType: 'air-drop',
									step: ($currentStep - 1).toString()
								})
							);
						} else if (page.route.id?.includes('edit')) {
							// TODO: implement edit campaign route
							// goto(routes.CAMPAIGNS.MANAGE.EDIT.ROOT);
						}
					}}
					{disabled}>Back</Button
				>
			{/if}
			<Button
				onclick={() => {
					clearCampaignDetails();
					goto(routes.CAMPAIGNS.MANAGE.ROOT);
				}}
				{disabled}
			>
				Discard
			</Button>
		</div>
		<div class="flex flex-row gap-2">
			<Button
				onclick={localHandleNext}
				styleVariant={$currentStep === $steps.length
					? EButtonStyleVariant.POSITIVE
					: EButtonStyleVariant.PRIMARY}
				{disabled}
			>
				{$isLastStep ? 'Submit Campaign' : $isPreLastStep ? 'Summary' : 'Next'}
			</Button>
		</div>
	</div>
</div>
