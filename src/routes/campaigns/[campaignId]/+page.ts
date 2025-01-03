import { CampaignApi } from '$lib/api';
import {
	generateMockCampaign,
	generateMockDelegates,
	generateRandomTickerData
} from '$lib/features';
import { type IPrimaryDoughnutChartProps, ECampaignTimeLineItem } from '$lib/types';

export async function load({ params }) {
	const campaignId = params.campaignId;

	const res = await CampaignApi.getCampaignById(campaignId);

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

	const timeLineProps = [
		{
			iconStatus: ECampaignTimeLineItem.PROCESSING,
			title: 'Confirm Token Distribution',
			description:
				'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
			status: 'ongoing',
			date: new Date(),
			isLast: true
		},
		{
			iconStatus: ECampaignTimeLineItem.CHECKED,
			title: 'Initiate Campaign',
			description: 'The campaign is being initiated',
			status: 'success',
			date: '2024.12.20'
		},
		{
			iconStatus: ECampaignTimeLineItem.CHECKED,
			title: 'Campaign Draft',
			description: 'The campaign draft has been finalized and saved',
			status: 'success',
			date: '2024.12.15',
			isFirst: true
		}
	];

	return {
		campaign: res?.data ?? generateMockCampaign(),
		chartData,
		tickerData,
		delegates,
		timeLineProps
	};
}
