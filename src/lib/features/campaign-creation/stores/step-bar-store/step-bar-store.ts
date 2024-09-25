import { derived, get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { routes } from '$lib/constants';
import type { IStepBarCampaignOption, IStepBarStore } from '$lib/types';
import { validateForm } from '$lib/helpers';
import { airDropCampaignCreationConfig, campaignStore } from '$lib/features';

export const createStepBarStore = (stepsArg: IStepBarCampaignOption[]) => {
	const steps = writable(stepsArg);
	const currentStep = writable(get(steps)[0].value);
	const isLastStep = derived(currentStep, ($currentStep) => $currentStep === get(steps).length);
	const isPreLastStep = derived(
		currentStep,
		($currentStep) => $currentStep === get(steps).length - 1
	);

	const setCurrentStep = async (value: IStepBarCampaignOption['value']) => {
		const { campaignDetails } = campaignStore;

		if (value > get(currentStep)) {
			const isValid = await validateForm(
				get(campaignDetails) as unknown as Record<string, unknown>,
				airDropCampaignCreationConfig.validationsSchemas[get(currentStep) - 1]
			);

			if (!isValid) {
				return;
			}
		}

		currentStep.set(value);
		steps.update((options) => {
			return options.map((option) => ({
				...option,
				isActive: option.value === value,
				isCompleted: option.value < value
			}));
		});
	};

	const nextStep: IStepBarStore['nextStep'] = async () => {
		try {
			currentStep.update((current) => {
				const currentIndex = get(steps).findIndex((option) => option.value === current);
				const lastIndex = get(steps).length - 1;
				const nextIndex = Math.min(currentIndex + 1, lastIndex);

				if (get(isLastStep)) {
					goto(routes.CAMPAIGNS.ROOT);
					return current;
				}

				setCurrentStep(get(steps)[currentIndex + 1].value);

				return get(steps)[nextIndex].value;
			});
		} catch (e) {
			console.log('nextStep Error', e);
		}
	};

	return {
		steps,
		currentStep,
		setCurrentStep,
		nextStep,
		isLastStep,
		isPreLastStep
	};
};
