<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/constants';
	import { airDropCampaignCreationConfig, campaignStore } from '$lib/features';
	import { Button } from '$lib/components';
	import { EButtonVariant, type INavigationFooterProps, type IStepBarStore } from '$lib/types';
	import CloseIcon from '$lib/assets/icons/x.svg?component';

	import ArrowIcon from '$lib/assets/icons/arrow-1.svg?component';
	import PlusIcon from '$lib/assets/icons/plus.svg?component';
	import { validateForm } from '$lib/helpers';

	export let handleBack: INavigationFooterProps['handleBack'] = () => {};
	export let disabled: INavigationFooterProps['disabled'] = false;

	const { campaignDetails, clearCampaignDetails, createCampaign } = campaignStore;
	const { nextStep, currentStep, setCurrentStep, steps, isLastStep, isPreLastStep } =
		getContext<IStepBarStore>('stepBarStore');

	$: localHandleNext = async () => {
		if ($isLastStep) {
			const isCreated = await createCampaign();
			if (isCreated) {
				await goto(routes.CAMPAIGNS.MANAGE.ROOT);
			}
			return;
		}
		let isValid;

		isValid = await validateForm(
			$campaignDetails as unknown as Record<string, unknown>,
			airDropCampaignCreationConfig.validationsSchemas[$currentStep - 1]
		);

		if (isValid) {
			nextStep();
		}
	};
</script>

<div class="flex w-full justify-center items-end">
	<div class=" flex flex-row justify-between mt-auto flex-1 max-w-screen-2xl py-8">
		<div class="flex flex-row gap-2">
			{#if $currentStep > 1}
				<Button
					styleVariant={EButtonVariant.SECONDARY}
					on:click={() => {
						if (handleBack) {
							handleBack();
						}
						setCurrentStep($currentStep - 1);
					}}
					{disabled}>Back</Button
				>
			{/if}
			<Button
				Icon={CloseIcon}
				on:click={() => {
					clearCampaignDetails();
					goto(routes.CAMPAIGNS.ROOT);
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
					? EButtonVariant.SECONDARY
					: EButtonVariant.PRIMARY}
				Icon={$currentStep === $steps.length - 1 ? PlusIcon : ArrowIcon}
				{disabled}
			>
				{$isLastStep ? 'Submit' : $isPreLastStep ? 'Summary' : 'Next'}
			</Button>
		</div>
	</div>
</div>
