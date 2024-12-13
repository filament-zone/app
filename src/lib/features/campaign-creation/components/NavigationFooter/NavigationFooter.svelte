<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/constants';
	import { campaignStore } from '$lib/features';
	import { Button } from '$lib/components';
	import { replaceUrlParams } from '$lib/helpers';
	import { EButtonStyleVariant, type INavigationFooterProps, type IStepBarStore } from '$lib/types';

	import CloseIcon from '$lib/assets/icons/x.svg?component';
	import ArrowIcon from '$lib/assets/icons/arrow-1.svg?component';
	import PlusIcon from '$lib/assets/icons/plus.svg?component';

	export let handleBack: INavigationFooterProps['handleBack'] = () => {};
	export let disabled: INavigationFooterProps['disabled'] = false;

	const { clearCampaignDetails, createCampaign } = campaignStore;
	const { currentStep, steps, isLastStep, isPreLastStep, validateCurrentStep } =
		getContext<IStepBarStore>('stepBarStore');

	$: localHandleNext = async () => {
		if ($isLastStep) {
			const isCreated = await createCampaign();
			if (isCreated) {
				await goto(routes.CAMPAIGNS.MANAGE.ROOT);
			}
			return;
		}
		const isValid = await validateCurrentStep();

		if (isValid) {
			goto(
				replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
					campaignType: 'air-drop',
					step: ($currentStep + 1).toString()
				})
			);
		}
	};
</script>

<div class="flex w-full justify-center items-end mt-auto">
	<div class=" flex flex-row justify-between mt-auto flex-1 max-w-screen-2xl py-8">
		<div class="flex flex-row gap-2">
			{#if $currentStep > 1}
				<Button
					styleVariant={EButtonStyleVariant.SECONDARY}
					on:click={() => {
						if (handleBack) {
							handleBack();
						}
						if ($page.route.id?.includes('create')) {
							goto(
								replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
									campaignType: 'air-drop',
									step: ($currentStep - 1).toString()
								})
							);
						} else if ($page.route.id?.includes('edit')) {
							// TODO: implement edit campaign route
							// goto(routes.CAMPAIGNS.MANAGE.EDIT.ROOT);
						}
					}}
					{disabled}>Back</Button
				>
			{/if}
			<Button
				Icon={CloseIcon}
				on:click={() => {
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
				on:click={localHandleNext}
				styleVariant={$currentStep === $steps.length - 1
					? EButtonStyleVariant.SECONDARY
					: EButtonStyleVariant.PRIMARY}
				Icon={$currentStep === $steps.length - 1 ? PlusIcon : ArrowIcon}
				{disabled}
			>
				{$isLastStep ? 'Submit' : $isPreLastStep ? 'Summary' : 'Next'}
			</Button>
		</div>
	</div>
</div>
