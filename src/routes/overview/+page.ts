import { flexRender } from '@tanstack/svelte-table';
import { PlainLineChart, TableNetworkComponent, TrendDisplay } from '$lib/components';
import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';
import {
	type IPlainLineChartProps,
	type ITableNetworkComponentProps,
	type ITableProps,
	type ITrendDisplayProps
} from '$lib/types';
import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';

type TableData = {
	id: string;
	name: ITableNetworkComponentProps;
	marketCap: ITrendDisplayProps;
	tokenLiquidity: ITrendDisplayProps;
	ibcTransfers: ITrendDisplayProps;
	tvl: ITrendDisplayProps;
	tvlChange: IPlainLineChartProps;
};

const labels = generateDateLabels('2022-12-01', '2022-12-31');
const chartStyles = 'height: 60px; width: 128px';

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

	const defaultData: TableData[] = [
		{
			id: '1',
			name: { Icon: FilamentLogo, label: 'Filament Network', ticker: 'FILA' },
			marketCap: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(24h)',
				direction: 'down'
			},
			tokenLiquidity: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(7d)',
				direction: 'down'
			},
			ibcTransfers: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(7d)',
				direction: 'down'
			},
			tvl: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(7d)',
				direction: 'down'
			},
			tvlChange: {
				data: {
					labels,
					datasets: [
						{
							data: createSmoothRandomData(labels.length, 100, 120)
						}
					]
				},
				styles: chartStyles
			}
		},
		{
			id: '2',
			name: { Icon: FilamentLogo, label: 'Filament Network', ticker: 'FILA' },
			marketCap: {
				value: '$300.12K',
				change: '+4.22%',
				period: '(24h)',
				direction: 'up'
			},
			tokenLiquidity: {
				value: '$300.12K',
				change: '+4.22%',
				period: '(7d)',
				direction: 'up'
			},
			ibcTransfers: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(7d)',
				direction: 'down'
			},
			tvl: {
				value: '$11.12M',
				change: '-3.32%',
				period: '(7d)',
				direction: 'down'
			},
			tvlChange: {
				data: {
					labels,
					datasets: [
						{
							data: createSmoothRandomData(labels.length, 100, 120)
						}
					]
				},
				styles: chartStyles
			}
		}
	];

	const tableData: ITableProps = {
		tableLabel: 'Table Label',
		columnDef: [
			{
				accessorKey: 'id',
				header: '#',
				size: 30,
				meta: {
					class: 'sticky'
				}
			},
			{
				accessorKey: 'name',
				header: 'Name',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(TableNetworkComponent, { ...value });
				},
				size: 175,
				meta: {
					class: 'sticky'
				}
			},
			{
				accessorKey: 'marketCap',
				header: 'Market Cap',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(TrendDisplay, { ...value });
				}
			},
			{
				accessorKey: 'tokenLiquidity',
				header: 'Token Liquidity',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(TrendDisplay, { ...value });
				}
			},
			{
				accessorKey: 'ibcTransfers',
				header: 'IBC transfers(7d)',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(TrendDisplay, { ...value });
				}
			},
			{
				accessorKey: 'tvl',
				header: 'TVL',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(TrendDisplay, { ...value });
				}
			},
			{
				accessorKey: 'tvlChange',
				header: 'TVL Change(7d)',
				cell: (info) => {
					const value = info.getValue() as unknown as TableData['name'];
					return flexRender(PlainLineChart, { ...value });
				}
			}
		],
		data: defaultData
	};
	return {
		cards,
		tableData
	};
}
