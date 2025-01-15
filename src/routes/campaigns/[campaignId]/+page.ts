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

	const getChartData = (): IPrimaryDoughnutChartProps['chartData'] => {
		const votesData = { ...criteriaVotesRes?.data };

		let approvedCount = 0;
		let rejectedCount = 0;

		if (votesData) {
			for (const value of Object.values(votesData)) {
				if (value === 'Rejected') {
					rejectedCount++;
				} else {
					approvedCount++;
				}
			}
		}
		return {
			labels: ['Approved', 'Rejected'],
			datasets: [
				{
					data: [approvedCount, rejectedCount],
					backgroundColor: ['#7DFA97', '#FF74A4']
				}
			]
		};
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
		chartData: getChartData(),
		tickerData,
		delegates,
		criteriaVotes: criteriaVotesRes?.data ?? []
	};
}
