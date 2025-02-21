<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ProgressBar, Table } from '$lib/components';
	import { FlexRender } from '@tanstack/svelte-table';
	import moment from 'moment/moment.js';
	import { stylesObjectToString } from '$lib/helpers';
	import type { ITableProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Table',
		component: Table
	};

	type OngoingT = {
		name: string;
		duration: { start: string; end: string };
		budget: { used: number; total: number };
		cnv: number;
		impressions: number;
		uniqAd: number;
	};

	const defaultData: OngoingT[] = [
		{
			name: 'BadKid',
			duration: { start: '2021-01-01', end: '2021-01-31' },
			budget: { used: 20, total: 100 },
			cnv: 100,
			impressions: 1000,
			uniqAd: 100
		},
		{
			name: 'xyz',
			duration: { start: '2021-02-01', end: '2021-02-28' },
			budget: { used: 77, total: 100 },
			cnv: 200,
			impressions: 2000,
			uniqAd: 200
		},
		{
			name: 'Xyz',
			duration: { start: '2021-03-01', end: '2021-03-31' },
			budget: { used: 98, total: 100 },
			cnv: 300,
			impressions: 3000,
			uniqAd: 300
		},
		{
			name: 'Campaign 4',
			duration: { start: '2021-04-01', end: '2021-04-30' },
			budget: { used: 4, total: 100 },
			cnv: 400,
			impressions: 4000,
			uniqAd: 400
		},
		{
			name: 'Campaign 5',
			duration: { start: '2021-05-01', end: '2021-05-31' },
			budget: { used: 50, total: 100 },
			cnv: 500,
			impressions: 5000,
			uniqAd: 500
		}
	];

	const defaultColumns: ITableProps['columnDef'] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'duration',
			header: 'Duration',
			cell: (info) => {
				const value = info.getValue() as unknown as OngoingT['duration'];
				return `${moment(value?.start).format('DD/MM')} - ${moment(value?.end).format('DD/MM/YYYY')}`;
			}
		},
		{
			accessorKey: 'budget',
			header: 'Budget',
			cell: (info) => {
				const value = info.getValue() as unknown as OngoingT['budget'];
				return FlexRender(ProgressBar, {
					total: value.total,
					used: value.used,
					styles: stylesObjectToString({ height: '5px' })
				});
			}
		},
		{
			accessorKey: 'cnv',
			header: 'CNV',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'impressions',
			header: 'Impressions',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'uniqAd',
			header: 'Unique adr.',
			footer: (info) => info.column.id
		}
	];
</script>

<Template>
	{#snippet children({ args })}
		<Table {...args} />
	{/snippet}
</Template>

<Story
	name="Primary"
	args={{
		tableLabel: 'Ongoing',
		columnDef: defaultColumns,
		data: defaultData
	}}
/>
