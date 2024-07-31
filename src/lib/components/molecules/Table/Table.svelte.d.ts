import { type ComponentType, SvelteComponent } from 'svelte';
import '@tanstack/svelte-table';
import type { RowData } from '@tanstack/table-core';
import type { ColumnDef } from '@tanstack/svelte-table';
import type { IPaginationProps } from 'types';

declare const __propDef: {
	props: {
		tableLabel: string;
		tableRightLabel?: string | ComponentType<SvelteComponent>;
		tableRightLabelProps?: object;
		data: RowData[];
		columnDef: ColumnDef<RowData>[];
		pagination?: IPaginationProps['pagination'] | null;
		onPageChange?: IPaginationProps['onPageChange'];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITableProps_ = typeof __propDef.props;
export type { ITableProps_ as ITableProps };
export type ITableEvents = typeof __propDef.events;
export type ITableSlots = typeof __propDef.slots;

export default class Table extends SvelteComponent<ITableProps, ITableEvents, ITableSlots> {}
