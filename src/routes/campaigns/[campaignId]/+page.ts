import { CampaignApi } from '$lib/api';
import { campaignDetailsStore, generateMockDelegates } from '$lib/features';
import { shortCutTransactionHash } from '$lib/helpers';
import { type IPrimaryDoughnutChartProps } from '$lib/types';
import type { CriteriaVote } from '@filament-zone/filament/CriteriaVote';
import type { DistributionVote } from '@filament-zone/filament/DistributionVoteOption';

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

	const generateChartData = (
		votesData: Record<string, CriteriaVote | DistributionVote>
	): IPrimaryDoughnutChartProps['chartData'] => {
		let approvedCount = 0;
		let rejectedCount = 0;

		for (const value of Object.values(votesData ?? {})) {
			if (value === 'Rejected') {
				rejectedCount++;
			} else {
				approvedCount += Number(value.Approved.weights[0]);
			}
		}

		if (!approvedCount && !rejectedCount) {
			return null;
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

	const getChartDataCriteria = (): IPrimaryDoughnutChartProps['chartData'] =>
		generateChartData({ ...criteriaVotesRes?.data });

	const getChartDataDistribution = (): IPrimaryDoughnutChartProps['chartData'] =>
		generateChartData({ ...distributionVotesRes?.data });

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
		chartDataCriteria: getChartDataCriteria(),
		chartDataDistribution: getChartDataDistribution(),
		tickerData,
		delegates,
		criteriaVotes: criteriaVotesRes?.data ?? []
	};
}
