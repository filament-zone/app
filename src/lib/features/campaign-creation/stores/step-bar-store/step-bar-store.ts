import { derived, get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { routes } from '$lib/constants';
import type { IStepBarCampaignOption, IStepBarStore } from '$lib/types';

export const createStepBarStore = (stepsArg: IStepBarCampaignOption[]) => {
	const steps = writable(stepsArg);
	const currentStep = writable(get(steps)[0].value);
	const isLastStep = derived(currentStep, ($currentStep) => $currentStep === get(steps).length);
	const isPreLastStep = derived(
		currentStep,
		($currentStep) => $currentStep === get(steps).length - 1
	);

	const setCurrentStep = (value: IStepBarCampaignOption['value']) => {
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

				if (isLastStep) {
					goto(routes.CAMPAIGNS.MY.ROOT);
				}

				setCurrentStep(get(steps)[currentIndex + 1].value);

				return get(steps)[nextIndex].value;
			});
		} catch {
			console.log('validationError');
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
