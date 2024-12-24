import { CampaignHubApiClient } from '$lib/api';
import {
	generateMockCampaign,
	generateMockDelegates,
	generateRandomTickerData
} from '$lib/features';
import type { IPrimaryDoughnutChartProps } from '$lib/types';

export async function load({ params }) {
	const campaignId = params.campaignId;

	const res = await CampaignHubApiClient.getCampaignById(campaignId);

	const chartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Onchain Gov', 'Vesting', 'Circulating'],
		datasets: [
			{
				data: [40.35, 70.12, 33.23],
				backgroundColor: ['#d9ffe0', '#b5fdc3', '#7dfa97']
			}
		]
	};

	const tickerData: { name: string; date: string; status: string }[] = generateRandomTickerData(15);

	const delegates = generateMockDelegates();

	return {
		campaign: res?.data ?? generateMockCampaign(),
		chartData,
		tickerData,
		delegates
	};
}
