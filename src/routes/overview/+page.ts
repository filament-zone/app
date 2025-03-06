import { type ILineChartWithControlsProps, type ISecondaryDoughnutChartProps } from '$lib/types';
import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';
import { formatLargeNumber } from '$lib/utils';
import { defaultToggleOptions } from '$lib/constants';

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

	const inflationChartData: ISecondaryDoughnutChartProps['chartData'] = {
		labels: ['Bonded', 'Unbonded'],
		datasets: [
			{
				data: [40.35, 70.12],
				backgroundColor: ['#FF74A4', '#7DFA97']
			}
		]
	};

	const supplyChartData: ISecondaryDoughnutChartProps['chartData'] = {
		labels: ['Onchain Gov', 'Vesting', 'Circulating'],
		datasets: [
			{
				data: [40.35, 70.12, 33.23],
				backgroundColor: ['#FF74A4', '#7DFA97', '#B7ABFC']
			}
		]
	};

	const labels = generateDateLabels('2015-01-01', '2022-12-31');

	const tvlData: ILineChartWithControlsProps = {
		chartData: {
			labels,
			datasets: [
				{
					label: 'Views',
					data: createSmoothRandomData(labels.length, 100, 120)
				}
			]
		},
		label: 'TVL',
		formatter: (value: number) => formatLargeNumber(value, '$'),
		useLastValue: true
	};

	const stakedData: ILineChartWithControlsProps = {
		chartData: {
			labels,
			datasets: [
				{
					label: 'Views',
					data: createSmoothRandomData(labels.length, 100, 120)
				}
			]
		},
		label: 'Staked FILA',
		formatter: formatLargeNumber
	};

	const newAddressesData: ILineChartWithControlsProps = {
		chartData: {
			labels,
			datasets: [
				{
					label: 'Views',
					data: createSmoothRandomData(labels.length, 100, 120)
				}
			]
		},
		label: 'Total Delegators',
		formatter: formatLargeNumber
	};

	return {
		cards,
		totalSupply,
		inflationChartData,
		supplyChartData,
		tvlData,
		stakedData,
		newAddressesData,
		defaultToggleOptions: defaultToggleOptions.map((option) => ({
			value: option,
			label: option.toUpperCase()
		}))
	};
}
