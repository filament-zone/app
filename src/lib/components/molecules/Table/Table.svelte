<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type OnChangeFn,
		type VisibilityState,
		type TableOptions
	} from '@tanstack/svelte-table';
	import type { RowData } from '@tanstack/table-core';
	import { Typography, Pagination } from '$lib/components';
	import { stylesObjectToString } from '$lib/helpers';
	import type { ITableProps } from '$lib/types';

	export let tableLabel: ITableProps['tableLabel'] = '';
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
</script>

<div class="p-2 w-full">
	{#if tableLabel}
		<div class="table-title mb-16">
			<Typography variant="h2">{tableLabel}</Typography>
		</div>{/if}
	<table class="w-full">
		<thead>
			{#each $tableClient.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th class="p-2">
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>

		<tbody>
			{#each $tableClient.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td class="p-2" style={stylesObjectToString(cell.column.columnDef.meta?.cellStyle)}>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	{#if !$tableClient.getRowModel().rows.length}
		<div class="flex justify-center items-center w-full h-[412px] text-white flex-col">NO DATA</div>
	{/if}

	{#if pagination}
		<div class="mt-[16px]">
			<Pagination {pagination} {onPageChange} />
		</div>
	{/if}
</div>

<style lang="less">
	table {
		border-collapse: separate;
		border-spacing: 0 8px;
		width: 100%;
		box-shadow: 0 0 0 0.1px var(--primary-white);
		th {
			padding: 10px 10px;
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
				padding: 3px 10px;
			}
		}
	}
</style>
