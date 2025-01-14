import { flexRender } from '@tanstack/svelte-table';
import { Badge } from '$lib/components';
import { EBadgeColorVariant, type IEligibilityCriteria, type ITableProps } from '$lib/types';

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

			return flexRender(Badge, {
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

			return flexRender(Badge, {
				label: value?.toLocaleString() ?? '0',
				colorVariant: EBadgeColorVariant.PRIMARY,
				RightContent: 'FILA'
			});
		}
	}
] as ITableProps['columnDef'];
