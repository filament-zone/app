<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type OnChangeFn,
		type VisibilityState,
		type TableOptions,
		type Cell,
		type Header
	} from '@tanstack/svelte-table';
	import type { RowData } from '@tanstack/table-core';
	import { Typography, Pagination } from '$lib/components';
	import { stylesObjectToString } from '$lib/helpers';
	import type { ITableProps } from '$lib/types';

	export let tableLabel: ITableProps['tableLabel'] = '';
	export let tableRightLabel: ITableProps['tableRightLabel'] = '';
	export let tableRightLabelProps: ITableProps['tableRightLabelProps'] = {};
	export let columnDef: ITableProps['columnDef'] = [];
	export let data: ITableProps['data'] = [];
	export let pagination: ITableProps['pagination'] = null;
	export let onPageChange: ITableProps['onPageChange'] = () => {};

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

	const options = writable<TableOptions<RowData>>({
		data: data,
		columns: columnDef,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility
		},
		onColumnVisibilityChange: setColumnVisibility
	});

	$: {
		options.update((prev) => ({
			...prev,
			data
		}));
	}

	export let tableClient = createSvelteTable(options);

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
</script>

<div class="">
	<div class="flex flex-row justify-between items-center">
		{#if tableLabel}
			<div class="table-title mb-4">
				<Typography variant="h2">{tableLabel}</Typography>
			</div>{/if}
		{#if tableRightLabel}
			<div class="flex flex-row justify-end w-2/3">
				{#if typeof tableRightLabel === 'string'}
					<div class="table-right-label mb-4">
						<Typography variant="h2">{tableRightLabel}</Typography>
					</div>
				{:else}
					<div>
						<svelte:component this={tableRightLabel} {...tableRightLabelProps} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	{#if $tableClient.getRowModel().rows.length}
		<div class="overflow-x-auto border-default-box-shadow">
			<table class="">
				<tbody>
					{#each $tableClient.getHeaderGroups() as headerGroup}
						<tr class="header">
							{#each headerGroup.headers as header, index}
								<th
									class={`${isHeaderSticky(headerGroup.headers, index) ? 'sticky' : ''} p-2`}
									style={`${isHeaderSticky(headerGroup.headers, index)}; width: ${header.getSize()}px`}
								>
									{#if !header.isPlaceholder}
										<svelte:component
											this={flexRender(header.column.columnDef.header, header.getContext())}
										/>
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
					{#each $tableClient.getRowModel().rows as row}
						<tr>
							{#each row.getVisibleCells() as cell, index}
								<td
									style={`${stylesObjectToString(cell.column.columnDef.meta?.cellStyle)}; ${getLeftIfSticky(row.getVisibleCells(), index)}; width: ${cell.column.getSize()}px`}
									class={cell.column.columnDef.meta?.class}
								>
									<svelte:component
										this={flexRender(cell.column.columnDef.cell, cell.getContext())}
									/>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if !$tableClient.getRowModel().rows.length}
		<div class="flex justify-center items-center w-full h-[412px] border-default-box-shadow">
			<Typography variant="h5">NO DATA</Typography>
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

		.header {
			background-color: var(--background);
		}

		th {
			padding: 10px 12px;
			color: var(--gray-200);
			font-family: 'ff-meta-serif-web-pro', serif;
			font-size: 0.875rem;
			font-style: normal;
			font-weight: 500;
			line-height: 0.875rem;
			text-align: start;
		}
		tbody {
			border-spacing: 30px;
			tr {
				color: var(--primary-white);
				background-color: var(--background);
				box-shadow: 0 0 0 0.1px var(--default);
				height: 34px;
				border-radius: 4px;
			}
			td {
				padding: 4px 12px;
			}
		}
	}

	.sticky {
		position: sticky;
		background-color: var(--background);
	}
</style>
