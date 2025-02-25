import { FlexRender, renderComponent } from '@tanstack/svelte-table';
import { Badge, ProgressBar } from '$lib/components';
import {
	EBadgeColorVariant,
	type IBadgeProps,
	type IDelegate,
	type IProgressBarProps,
	type ITableProps
} from '$lib/types';
import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';
import { stylesObjectToString } from '$lib/helpers';
import type { Component } from 'svelte';

export const delegatesColumnDefCommon = [
	{
		accessorKey: 'name',
		header: 'Delegate',
		cell: (info) => {
			return info.getValue() as IDelegate['name'];
		},
		meta: {
			class: 'sticky'
		}
	},
	{
		accessorKey: 'value',
		header: '',
		cell: (info) => {
			const value = info.getValue() as IDelegate['value'];
			return renderComponent(ProgressBar as unknown as Component<IProgressBarProps>, {
				total: 100,
				used: Number(value) * 100,
				styles: stylesObjectToString({ height: '26px' }),
				displayLabel: true
			});
		}
	},
	{
		accessorKey: 'votingPower',
		header: 'Voting Power (VP)',
		cell: (info) => {
			const votingPower = info.getValue() as IDelegate['votingPower'];
			return renderComponent(Badge as unknown as Component<IBadgeProps>, {
				label: votingPower.toLocaleString(),
				colorVariant: EBadgeColorVariant.PRIMARY,
				LeftContent: 'VP',
				RightContent: 'FILA',
				textColor: 'var(--foreground)'
			});
		}
	},
	{
		header: ' ',
		cell: () => {
			return FlexRender(ArrowRight, {});
		},
		size: 10
	},
	{
		accessorKey: 'evictionCost',
		header: 'Eviction Cost (EC)',
		cell: (info) => {
			const evictionCost = info.getValue() as IDelegate['evictionCost'];
			return renderComponent(Badge as unknown as Component<IBadgeProps>, {
				label: evictionCost.toLocaleString(),
				colorVariant: EBadgeColorVariant.SECONDARY,
				LeftContent: 'EC',
				RightContent: 'FILA',
				textColor: 'var(--rugged)'
			});
		}
	}
] as ITableProps['columnDef'];

export const delegatesColumnDefCommonSecond = [
	{
		accessorKey: 'address',
		header: 'Address',
		cell: (info) => {
			return info.getValue() as IDelegate['name'];
		},
		meta: {
			class: 'sticky'
		}
	},
	{
		accessorKey: 'percentage',
		header: '',
		cell: (info) => {
			const value = info.getValue() as IDelegate['value'];
			return renderComponent(ProgressBar as unknown as Component<IProgressBarProps>, {
				total: 100,
				used: Number(value) * 100,
				styles: stylesObjectToString({ height: '26px' }),
				displayLabel: true
			});
		}
	},
	{
		accessorKey: 'votingPower',
		header: 'Voting Power (VP)',
		cell: (info) => {
			const votingPower = info.getValue() as IDelegate['votingPower'];
			return renderComponent(Badge as unknown as Component<IBadgeProps>, {
				label: votingPower.toLocaleString(),
				colorVariant: EBadgeColorVariant.PRIMARY,
				LeftContent: 'VP',
				RightContent: 'FILA',
				textColor: 'var(--foreground)'
			});
		}
	}
] as ITableProps['columnDef'];
