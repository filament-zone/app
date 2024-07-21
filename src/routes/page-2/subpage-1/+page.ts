import type { IPrimaryDoughnutChartProps } from '$lib/components/molecules/charts/DoughnutChart/PrimaryDoughnutChart/PrimaryDoughnutChart.svelte';

export async function load() {
	const cards = [
		{
			label: 'Native Token Price',
			data: {
				value: '1 FILA ≈ $770.99',
				change: '-3.32%',
				period: '(24h)',
				direction: 'down'
			}
		},
		{
			label: 'Market Cap',
			data: {
				value: '$380,654,380',
				change: '-3.26%',
				period: '(24h)',
				direction: 'down'
			}
		},
		{
			label: 'Total Trading Volume (7d)',
			data: {
				value: '$5,090,487',
				change: '26.36%',
				period: '(7d)',
				direction: 'up'
			}
		},
		{
			label: 'Staking APR',
			data: {
				value: '7.01%',
				change: '-5.73%',
				period: '(7d)',
				direction: 'down'
			}
		}
	];
	const totalSupply: string = '1,028,677,927 FILA';

	const inflationChartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Bonded', 'Unbonded'],
		datasets: [
			{
				data: [40.35, 70.12],
				backgroundColor: ['#05dbdb', '#fbff4f']
			}
		]
	};

	const supplyChartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Onchain Gov', 'Vesting', 'Circulating'],
		datasets: [
			{
				data: [40.35, 70.12, 33.23],
				backgroundColor: ['#05dbdb', '#fbff4f', '#FFCE56']
			}
		]
	};
	return { cards, totalSupply, inflationChartData, supplyChartData };
}
