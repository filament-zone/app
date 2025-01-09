import { CampaignApi } from '$lib/api';
import {
	generateMockCampaign,
	generateMockDelegates,
	generateRandomTickerData
} from '$lib/features';
import { type IPrimaryDoughnutChartProps } from '$lib/types';

export async function load({ params }) {
	const campaignId = params.campaignId;

	const campaignDataRes = await CampaignApi.getCampaignById(campaignId);
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

	const tickerData: { name: string; date: string; status: string }[] = generateRandomTickerData(15);

	const delegates = generateMockDelegates();

	return {
		campaign: campaignDataRes?.data ?? generateMockCampaign(),
		chartData,
		tickerData,
		delegates,
		criteriaVotes: criteriaVotesRes?.data ?? [],
		distributionVotes: distributionVotesRes?.data ?? []
	};
}
