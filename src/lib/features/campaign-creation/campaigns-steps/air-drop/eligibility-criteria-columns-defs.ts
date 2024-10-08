import { flexRender } from '@tanstack/svelte-table';
import { Badge } from '$lib/components';
import { EBadgeColorVariant, type IEligibilityCriteria, type ITableProps } from '$lib/types';
import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';

export const eligibilityCriteriaColumnDefCommon = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => {
			return info.getValue() as IEligibilityCriteria['name'];
		}
	},
	{
		accessorKey: 'type',
		header: 'Type',
		cell: (info) => {
			const value = info.getValue() as IEligibilityCriteria['type'];
			let label = '';
			if (value) {
				const result = value.replace(/-/g, ' ').toLocaleLowerCase();
				label = result.replace(/\b\w+/g, (word) => {
					return word === 'by' ? word : word.charAt(0).toUpperCase() + word.slice(1);
				});
			}

			return flexRender(Badge, {
				label,
				colorVariant: EBadgeColorVariant.PRIMARY
			});
		}
	},
	{
		accessorKey: 'tvl',
		header: 'TVL',
		cell: (info) => {
			const value = info.getValue() as IEligibilityCriteria['tvl'];
			return flexRender(Badge, {
				label: value?.toLocaleString(),
				colorVariant: EBadgeColorVariant.PRIMARY,
				LeftIcon: '$',
				RightIcon: 'TVL'
			});
		}
	},
	{
		header: ' ',
		cell: () => {
			return flexRender(ArrowRight, {});
		},
		size: 10
	},
	{
		accessorKey: 'weight',
		header: 'Weight',
		cell: (info) => {
			const value = info.getValue() as IEligibilityCriteria['weight'];
			return flexRender(Badge, {
				label: value?.toLocaleString(),
				colorVariant: EBadgeColorVariant.SECONDARY,
				LeftIcon: 'X',
				RightIcon: 'Weight'
			});
		}
	}
] as ITableProps['columnDef'];
