import { FlexRender, renderComponent } from '@tanstack/svelte-table';
import { Badge } from '$lib/components';
import {
	EBadgeColorVariant,
	type IBadgeProps,
	type IEligibilityCriteria,
	type ITableProps
} from '$lib/types';
import type { Component } from 'svelte';

export const distributionInsightsColumnDef = [
	{
		accessorKey: 'recipients',
		header: 'Total Recipients',
		cell: (info) => {
			return `${info.getValue() as string} Addresses`;
		}
	},
	{
		accessorKey: 'top-1-percent',
		header: 'Top 1% Addresses',
		cell: (info) => {
			return `${info.getValue() as string}% of AirDrop`;
		}
	},
	{
		accessorKey: 'top-10-percent',
		header: 'Top 10% Addresses',
		cell: (info) => {
			return `${info.getValue() as string}% of AirDrop`;
		}
	},
	{
		accessorKey: 'averageAllocation',
		header: 'Average Allocation',
		cell: (info) => {
			const value = info.getValue() as IEligibilityCriteria['tvl'];

			return renderComponent(Badge as unknown as Component<IBadgeProps>, {
				label: value?.toLocaleString() ?? '0',
				colorVariant: EBadgeColorVariant.PRIMARY,
				RightContent: 'FILA'
			});
		}
	}
] as ITableProps['columnDef'];
