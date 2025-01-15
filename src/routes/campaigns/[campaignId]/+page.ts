import { CampaignApi } from '$lib/api';
import { generateMockDelegates, campaignDetailsStore } from '$lib/features';
import { shortCutTransactionHash } from '$lib/helpers';
import { type IPrimaryDoughnutChartProps } from '$lib/types';

export async function load({ params }) {
	const campaignId = params.campaignId;

	const campaignDataRes = await CampaignApi.getCampaignById(BigInt(campaignId));

	if (!campaignDataRes?.data) {
		return;
	}

	const { setCampaignDetails } = campaignDetailsStore;

	setCampaignDetails(campaignDataRes?.data);

	const criteriaVotesRes = await CampaignApi.getCampaignCriteriaVotes(BigInt(campaignId));
	const distributionVotesRes = await CampaignApi.getCampaignDistributionVotes(BigInt(campaignId));

	const chartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Onchain Gov', 'Vesting', 'Circulating'],
		datasets: [
			{
				data: [40.35, 70.12, 33.23],
				backgroundColor: ['#FF74A4', '#7DFA97', '#B7ABFC']
			}
		]
	};

	const tickerData: { name: string; date: string; status: string }[] = criteriaVotesRes?.data
		? Object.entries(criteriaVotesRes?.data).map(([key, value]) => {
				return {
					name: shortCutTransactionHash(key),
					date: new Date().toString(),
					status: value === 'Rejected' ? 'Rejected' : 'Approved'
				};
			})
		: [];

	const delegates = generateMockDelegates();

	return {
		campaign: campaignDataRes?.data,
		chartData,
		tickerData,
		delegates,
		criteriaVotes: criteriaVotesRes?.data ?? [],
		distributionVotes: distributionVotesRes?.data ?? []
	};
}
