import type { Component } from 'svelte';
import '@tanstack/svelte-table';
import type { RowData } from '@tanstack/table-core';
import type { ColumnDef, Row, SortingState } from '@tanstack/svelte-table';
import type { IPaginationProps } from 'types';

export interface ITableProps {
	tableLabel: string;
	tableRightLabel?: string | Component | null;
	tableRightLabelProps?: object;
	data: RowData[];
	columnDef: ColumnDef<RowData>[];
	pagination?: IPaginationProps['pagination'] | null;
	onPageChange?: IPaginationProps['onPageChange'];
	onRowClick?: ((row: Row<RowData>) => void) | null;
	sortingState?: SortingState;
	headerBackground?: string;
	tableEmptyMessage?: string;
}

export declare const Table: Component<ITableProps>;
export default Table;
