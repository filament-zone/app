import { FlexRender, renderComponent } from '@tanstack/svelte-table';
import { Badge } from '$lib/components';
import {
	EBadgeColorVariant,
	type IBadgeProps,
	type IEligibilityCriteria,
	type ITableProps
} from '$lib/types';
import type { Component } from 'svelte';

export const distributionAllocationColumnDef = [
	{
		accessorKey: 'number',
		header: '',
		cell: (info) => {
			return `#${info.getValue() as string}`;
		},
		size: 20
	},
	{
		accessorKey: 'address',
		header: 'Address',
		cell: (info) => {
			return `${info.getValue() as string}`;
		}
	},
	{
		accessorKey: 'percentage',
		header: '',
		cell: (info) => {
			const value = info.getValue() as string;

			return renderComponent(Badge as unknown as Component<IBadgeProps>, {
				label: value?.toLocaleString() ?? '0',
				colorVariant: EBadgeColorVariant.SECONDARY
			});
		}
	},
	{
		accessorKey: 'totalAllocation',
		header: 'Total Allocation',
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
