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
	export let onRowClick: ITableProps['onRowClick'] = null;

	//console log data
	// const test = [
	// 	{
	// 		environment: 'evm',
	// 		supported_criteria: [
	// 			{
	// 				type: 'bank',
	// 				name: 'Token balances',
	// 				description: 'Snapshot an ERC20 token balance for a given chain',
	// 				chains: [
	// 					'ethereum',
	// 					'bnb',
	// 					'base',
	// 					'polygon',
	// 					'avalanche',
	// 					'chiliz',
	// 					'gnosis',
	// 					'cronos',
	// 					'fantom',
	// 					'arbitrum',
	// 					'palm',
	// 					'optimism',
	// 					'linea',
	// 					'moonbeam',
	// 					'flow',
	// 					'opbnb',
	// 					'zksync',
	// 					'polygon zkevm',
	// 					'zetachain',
	// 					'blast',
	// 					'mantle'
	// 				],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 1000 },
	// 					{ type: 'historic', price_per_snapshot: 1500 }
	// 				],
	// 				category: 'balance'
	// 			},
	// 			{
	// 				type: 'nft-holders',
	// 				name: 'NFT holders',
	// 				description: 'Snapshot the holders on an NFT collection',
	// 				chains: [
	// 					'ethereum',
	// 					'bnb',
	// 					'base',
	// 					'polygon',
	// 					'avalanche',
	// 					'chiliz',
	// 					'gnosis',
	// 					'cronos',
	// 					'fantom',
	// 					'arbitrum',
	// 					'palm',
	// 					'optimism',
	// 					'linea',
	// 					'moonbeam',
	// 					'flow',
	// 					'opbnb',
	// 					'zksync',
	// 					'polygon zkevm',
	// 					'zetachain',
	// 					'blast',
	// 					'mantle'
	// 				],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 1000 },
	// 					{ type: 'historic', price_per_snapshot: 1500 }
	// 				],
	// 				category: 'nft'
	// 			},
	// 			{
	// 				type: 'gas-fees',
	// 				name: 'Gas fees',
	// 				description: 'Snapshot the gas fees spent for a given chain',
	// 				chains: [
	// 					'scroll',
	// 					'linea',
	// 					'blast',
	// 					'zora',
	// 					'fantom',
	// 					'arbitrum',
	// 					'ethereum',
	// 					'zkevm',
	// 					'base',
	// 					'bnb',
	// 					'avalanche_c',
	// 					'gnosis',
	// 					'polygon',
	// 					'mantle',
	// 					'optimism',
	// 					'zksync',
	// 					'sei'
	// 				],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 1000 },
	// 					{ type: 'historic', price_per_snapshot: 1500 }
	// 				],
	// 				category: 'balance'
	// 			},
	// 			{
	// 				type: 'uniswap-v3-lp',
	// 				name: 'Liquidity providers on a Uniswap V3 pool',
	// 				description: 'Snapshot the liquidity providers on a Uniswap V3 pool',
	// 				chains: ['ethereum'],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 4000 },
	// 					{ type: 'historic', price_per_snapshot: 5000 }
	// 				],
	// 				category: 'defi'
	// 			},
	// 			{
	// 				type: 'uniswap-v3-volume',
	// 				name: 'Volume on a Uniswap V3 pool',
	// 				description: 'Snapshot the volume per address on a Uniswap V3 pool',
	// 				chains: ['ethereum'],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 3000 },
	// 					{ type: 'historic', price_per_snapshot: 4000 }
	// 				],
	// 				category: 'defi'
	// 			},
	// 			{
	// 				type: 'trading-profit',
	// 				name: 'Trading profit',
	// 				description: 'Snapshot the trading profit in dollars($) per address on a given chain',
	// 				chains: [
	// 					'ethereum',
	// 					'bnb',
	// 					'base',
	// 					'polygon',
	// 					'avalanche',
	// 					'chiliz',
	// 					'gnosis',
	// 					'cronos',
	// 					'fantom',
	// 					'arbitrum',
	// 					'palm',
	// 					'optimism',
	// 					'linea',
	// 					'moonbeam',
	// 					'flow',
	// 					'opbnb',
	// 					'zksync',
	// 					'polygon zkevm',
	// 					'zetachain',
	// 					'blast',
	// 					'mantle'
	// 				],
	// 				pricing: [
	// 					{ type: 'upcoming', price_per_snapshot: 1000 },
	// 					{ type: 'historic', price_per_snapshot: 1500 }
	// 				],
	// 				category: 'defi'
	// 			}
	// 		]
	// 	}
	// ];
	//
	// console.log(test);

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
					<div>
						<svelte:component this={tableRightLabel} {...tableRightLabelProps} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	{#if $tableClient.getRowModel().rows.length}
		<div class="overflow-x-auto">
			<table>
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
						<tr
							class={`data-row ${onRowClick ? 'isHoverable' : ''}`}
							on:click={() => {
								if (onRowClick) {
									onRowClick(row);
								}
							}}
							on:mouseenter={() => handleMouseEnterRow(row.id)}
							on:mouseleave={handleMouseLeaveRow}
						>
							{#each row.getVisibleCells() as cell, index}
								<td
									style={`${stylesObjectToString(cell.column.columnDef.meta?.cellStyle)}; ${getLeftIfSticky(row.getVisibleCells(), index)}; width: ${cell.column.getSize()}px`}
									class={cell.column.columnDef.meta?.class || ''}
									on:click={() => {
										cell.column.columnDef.meta?.onClick?.(cell);
									}}
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
		<div class="flex justify-center items-center w-full h-[412px]">
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
		border-collapse: separate;
		border-spacing: 0 10px;
		--table-border-radius: 10px;

		.header {
			background-color: var(--background);

			th {
				padding: 10px 12px;
				color: #8c8c8c;
				font-family: var(--primary-font);
				font-size: 1rem;
				font-weight: 500;
				text-align: left;
				background-color: var(--background);
			}
		}

		.data-row {
			background-color: var(--highlight-bg);

			&.isHoverable {
				cursor: pointer;
				&:hover {
					background-color: #333333;

					.sticky {
						background-color: #333333;
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
