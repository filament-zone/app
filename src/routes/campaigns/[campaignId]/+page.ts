import { HubApiClient } from '$lib/services';
import type { IPrimaryDoughnutChartProps } from '$lib/components/molecules/charts/DoughnutChart/PrimaryDoughnutChart/PrimaryDoughnutChart.svelte';

export async function load({ params }) {
	const campaignId = params.campaignId;
	const campaign = await HubApiClient.getCampaignById(campaignId);

	const chartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Onchain Gov', 'Vesting', 'Circulating'],
		datasets: [
			{
				data: [40.35, 70.12, 33.23],
				backgroundColor: ['#d9ffe0', '#b5fdc3', '#7dfa97']
			}
		]
	};

	return {
		campaign,
		chartData
	};
}
