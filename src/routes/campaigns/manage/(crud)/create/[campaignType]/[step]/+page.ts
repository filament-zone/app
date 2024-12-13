import { redirect } from '@sveltejs/kit';
import { routes } from '$lib/constants';
import { replaceUrlParams } from '$lib/helpers';

export async function load({ params, data, parent }) {
	const currentStep = params.step;

	const parentData = await parent();

	if (parentData.layoutData.initSteps.length < +currentStep) {
		redirect(
			301,
			replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
				campaignType: parentData.layoutData.selectedCampaignType,
				step: '1'
			})
		);
	}

	return {
		...data,
		currentStep
	};
}
