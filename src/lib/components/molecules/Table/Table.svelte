<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createTable,
		FlexRender,
		getCoreRowModel,
		getSortedRowModel,
		type OnChangeFn,
		type VisibilityState,
		type TableOptions,
		type Cell,
		type Header,
		type SortingState
	} from '@tanstack/svelte-table';
	import type { RowData } from '@tanstack/table-core';
	import { Typography, Pagination } from '$lib/components';
	import { stylesObjectToString } from '$lib/helpers';
	import type { ITableProps } from '$lib/types';

	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';
	import ChevronUpIcon from '$lib/assets/icons/chevron-up.svg?component';

	interface Props {
		tableLabel?: ITableProps['tableLabel'];
		tableRightLabel?: ITableProps['tableRightLabel'];
		tableRightLabelProps?: ITableProps['tableRightLabelProps'];
		columnDef?: ITableProps['columnDef'];
		data?: ITableProps['data'];
		pagination?: ITableProps['pagination'];
		onPageChange?: ITableProps['onPageChange'];
		onRowClick?: ITableProps['onRowClick'];
		sortingState?: ITableProps['sortingState'];
		tableEmptyMessage?: ITableProps['tableEmptyMessage'];
	}

	let {
		tableLabel = '',
		tableRightLabel = '',
		tableRightLabelProps = {},
		columnDef = [],
		data = [],
		pagination = null,
		onPageChange = () => {},
		onRowClick = null,
		sortingState = [],
		tableEmptyMessage = 'Table contains no data'
	}: Props = $props();

	let columnVisibility: VisibilityState = {};

	const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((prev) => ({
			...prev,
			state: {
				...prev.state,
				columnVisibility
			}
		}));
	};

	let sorting: SortingState = sortingState?.length ? [...sortingState] : [];

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const options = writable<TableOptions<RowData>>({
		data: data,
		columns: columnDef,
		state: {
			columnVisibility,
			sorting
		},
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	const tableClient = writable(createTable($options));

	const getLeftIfSticky = (cells: Cell<unknown, unknown>[], index: number) => {
		return cells[index].column.columnDef.meta?.class?.includes('sticky') && index > 0
			? `left: ${cells[index - 1].column.getSize()}px`
			: cells[index].column.columnDef.meta?.class?.includes('sticky') && index === 0
				? 'left: 0'
				: '';
	};

	const isHeaderSticky = (cells: Header<unknown, unknown>[], index: number) => {
		if (cells[index].column.columnDef.meta?.class?.includes('sticky')) {
			return `${getLeftIfSticky(cells as unknown as Cell<unknown, unknown>[], index)}; position: sticky`;
		}
	};

	const handleMouseEnterRow = (rowId: string) => {
		window.dispatchEvent(
			new CustomEvent('custom-table-hover-rowId', {
				detail: { rowId }
			})
		);
	};

	const handleMouseLeaveRow = () => {
		window.dispatchEvent(
			new CustomEvent('custom-table-hover-rowId', {
				detail: { rowId: null }
			})
		);
	};
	$effect(() => {
		options.update((prev) => ({
			...prev,
			data
		}));
	});
</script>

<div>
	<div class="flex flex-row justify-between items-center">
		{#if tableLabel}
			<div class="table-title">
				<Typography variant="h5">{tableLabel}</Typography>
			</div>{/if}
		{#if tableRightLabel}
			<div class="flex flex-row justify-end w-2/3">
				{#if typeof tableRightLabel === 'string'}
					<div class="table-right-label mb-4">
						<Typography variant="h2">{tableRightLabel}</Typography>
					</div>
				{:else}
					{@const SvelteComponent = tableRightLabel}
					<div>
						<SvelteComponent {...tableRightLabelProps} />
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="overflow-x-auto">
		<table>
			<tbody>
				{#each $tableClient.getHeaderGroups() as headerGroup}
					<tr class="header">
						{#each headerGroup.headers as header, index}
							<th
								class={`p-2`}
								class:cursor-pointer={header.column.getCanSort()}
								class:select-none={header.column.getCanSort()}
								onclick={header.column.getToggleSortingHandler()}
								style={`${isHeaderSticky(headerGroup.headers, index)}; width: ${header.getSize()}px`}
							>
								{#if !header.isPlaceholder}
									<div class="flex flex-row gap-2">
										<FlexRender
											content={typeof header.column.columnDef.header === 'function'
												? header.column.columnDef.header(header.getContext())
												: header.column.columnDef.header}
											context={header.getContext()}
										/>
										{#if header.column.getIsSorted().toString() === 'asc'}
											<ChevronUpIcon />
										{:else if header.column.getIsSorted().toString() === 'desc'}
											<ChevronDownIcon />
										{/if}
									</div>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
				{#if $tableClient.getRowModel().rows.length}
					{#each $tableClient.getRowModel().rows as row}
						<tr
							class={`data-row ${onRowClick ? 'isHoverable' : ''}`}
							onmousedown={() => {
								if (onRowClick) {
									onRowClick(row);
								}
							}}
							onmouseenter={() => handleMouseEnterRow(row.id)}
							onmouseleave={handleMouseLeaveRow}
						>
							{#each row.getVisibleCells() as cell, index}
								<td
									style={`${stylesObjectToString(cell.column.columnDef.meta?.cellStyle)}; ${getLeftIfSticky(row.getVisibleCells(), index)}; width: ${cell.column.getSize()}px`}
									class={cell.column.columnDef.meta?.class || ''}
									onclick={() => {
										cell.column.columnDef.meta?.onClick?.(cell);
									}}
								>
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	{#if !$tableClient.getRowModel().rows.length}
		<div class="flex justify-center items-center w-full h-[128px]">
			<Typography variant="h5">{tableEmptyMessage}</Typography>
		</div>
	{/if}
	{#if pagination}
		<div class="mt-[16px]">
			<Pagination {pagination} {onPageChange} />
		</div>
	{/if}
</div>

<style lang="less">
	table {
		width: 100%;
		table-layout: fixed;
		border-collapse: separate;
		border-spacing: 0 10px;
		--table-border-radius: 4px;

		.header {
			th {
				padding: 10px 12px;
				color: #d8d8d8;
				font-family: var(--primary-font);
				font-size: 0.95rem;
				font-weight: 500;
				text-align: left;
				letter-spacing: 0.04em;
			}
		}

		.data-row {
			background-color: var(--highlight-bg);

			&.isHoverable {
				cursor: pointer;
				&:hover {
					td {
						border-color: var(--filaMint);
					}
				}
			}

			td {
				padding: 10px 12px;
				color: #ffffff;
				font-family: var(--secondary-font);
				font-size: 0.875rem;
				border-top: 1px solid var(--default-border);
				border-bottom: 1px solid var(--default-border);

				&:first-child {
					border-left: 1px solid var(--default-border);
					border-top-left-radius: var(--table-border-radius);
					border-bottom-left-radius: var(--table-border-radius);
				}

				&:last-child {
					border-right: 1px solid var(--default-border);
					border-top-right-radius: var(--table-border-radius);
					border-bottom-right-radius: var(--table-border-radius);
				}
			}

			.sticky {
				position: sticky;
				background-color: var(--highlight-bg);
			}
		}
	}
</style>
