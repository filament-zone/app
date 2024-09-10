<script lang="ts">
	import { getContext } from 'svelte';
	import { airDropCampaignCreationConfig, campaignStore } from '$lib/features';
	import { Button } from '$lib/components';
	import { EButtonColorVariant, type INavigationFooterProps, type IStepBarStore } from '$lib/types';
	import CloseIcon from '$lib/assets/icons/x.svg?component';
	import SaveIcon from '$lib/assets/icons/save.svg?component';
	import ArrowIcon from '$lib/assets/icons/arrow-1.svg?component';
	import PlusIcon from '$lib/assets/icons/plus.svg?component';
	import { validateForm } from '$lib/helpers';

	export let handleBack: INavigationFooterProps['handleBack'] = () => {};
	export let handleDraft: INavigationFooterProps['handleDraft'] = () => {};
	export let disabled: INavigationFooterProps['disabled'] = false;

	const { campaignDetails } = campaignStore;
	const { clearCampaignDetails, createCampaign } = campaignStore;
	const { nextStep, currentStep, setCurrentStep, steps } =
		getContext<IStepBarStore>('stepBarStore');

	$: localHandleDraft = async () => {
		if (handleDraft) {
			handleDraft();
		}
		createCampaign();
	};

	$: localHandleNext = async () => {
		if ($currentStep === $steps.length - 1) {
			const isCreated = createCampaign();
			if (isCreated) {
				nextStep();
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
					colorVariant={EButtonColorVariant.BLACK}
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
				colorVariant={EButtonColorVariant.YELLOW}
				Icon={CloseIcon}
				on:click={() => {
					clearCampaignDetails();
					// goto(routes.CAMPAIGNS.LIST);
				}}
				{disabled}
			>
				Discard
			</Button>
		</div>
		<div class="flex flex-row gap-2">
			<Button
				colorVariant={EButtonColorVariant.BLACK}
				on:click={() => {
					localHandleDraft();
				}}
				Icon={SaveIcon}
				{disabled}>Save Draft</Button
			>
			<Button
				on:click={localHandleNext}
				colorVariant={$currentStep === $steps.length - 1
					? EButtonColorVariant.SECONDARY
					: EButtonColorVariant.PRIMARY}
				Icon={$currentStep === $steps.length - 1 ? PlusIcon : ArrowIcon}
				{disabled}
			>
				{$currentStep === $steps.length - 1
					? 'Submit'
					: $currentStep === $steps.length - 2
						? 'Summary'
						: 'Next'}
			</Button>
		</div>
	</div>
</div>
