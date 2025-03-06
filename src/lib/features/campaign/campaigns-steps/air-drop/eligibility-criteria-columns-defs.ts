import { renderComponent } from '@tanstack/svelte-table';
import { Badge } from '$lib/components';
import { EBadgeColorVariant, type IEligibilityCriteria, type ITableProps } from '$lib/types';
import ArrowRightIcon from '$lib/assets/icons/arrow-right.svg?component';

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

			if (!label) {
				return '';
			}

			return renderComponent(Badge, {
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

			return renderComponent(Badge, {
				label: value?.toLocaleString() ?? '0',
				colorVariant: EBadgeColorVariant.PRIMARY,
				LeftContent: '$'
			});
		}
	},
	{
		header: ' ',
		cell: () => {
			return renderComponent(ArrowRightIcon, {});
		},
		size: 10
	},
	{
		accessorKey: 'weight',
		header: 'Point(s)',
		cell: (info) => {
			const value = info.getValue() as IEligibilityCriteria['weight'];
			return renderComponent(Badge, {
				label: value?.toLocaleString(),
				colorVariant: EBadgeColorVariant.SECONDARY,
				LeftContent: 'x',
				RightContent: 'Point(s)',
				textColor: 'var(--filaMint)'
			});
		}
	}
] as ITableProps['columnDef'];
