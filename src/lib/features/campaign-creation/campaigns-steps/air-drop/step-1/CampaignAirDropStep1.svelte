<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { flexRender, type Row } from '@tanstack/svelte-table';
	import { campaignStore, delegatesColumnDefCommon, HoverableCellInverted } from '$lib/features';
	import { Container, Input, Table, TextArea, Typography } from '$lib/components';
	import { EDelegateType, EInputSizeVariant, type IDelegate, type ITableProps } from '$lib/types';

	const data = derived(page, () => $page.data);

	const { campaignDetails, toggleDelegate, getDelegates } = campaignStore;

	onMount(() => {
		getDelegates();
	});

	const delegateColumnDef: (delegateType: EDelegateType) => ITableProps['columnDef'] = (
		delegateType
	) => [
		...delegatesColumnDefCommon,
		{
			accessorKey: 'selected',
			header: '',
			cell: (value) => {
				return flexRender(HoverableCellInverted, {
					id: value.row.id,
					isSelected: delegateType === EDelegateType.ACTIVE
				});
			},
			size: 36,
			meta: {
				cellStyle: {
					cursor: 'pointer'
				},
				onClick: (cell) => {
					const selectedActiveDelegateId = cell.getContext().row.original.id as IDelegate['id'];
					toggleDelegate(selectedActiveDelegateId);
				}
			}
		}
	];

	$: activeDelegatesTable = {
		tableLabel: 'Active Delegates',
		data: [
			...$data.pageData.delegates.filter(
				(delegate: IDelegate) => !$campaignDetails.evictions?.includes(delegate.id)
			)
		],
		columnDef: delegateColumnDef(EDelegateType.ACTIVE),
		onRowClick: (row: Row<IDelegate>) => {
			toggleDelegate(row.original.id as string);
		},
		sortingState: [{ id: 'votingPower', desc: true }]
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	$: evictedDelegatesTable = {
		tableLabel: 'Evicted Delegates',
		data: [
			...$data.pageData.delegates.filter((delegate: IDelegate) =>
				$campaignDetails.evictions?.includes(delegate.id)
			)
		],
		columnDef: delegateColumnDef(EDelegateType.EVICTED),
		onRowClick: (row: Row<IDelegate>) => {
			toggleDelegate(row.original.id as string);
		},
		sortingState: [{ id: 'votingPower', desc: true }]
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<div class="flex flex-col gap-5">
	<Container label="Introduction">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>On this page you can start to setup your airdrop. Please provide a general description
				which introduces the campaign details. Try to write in a concise, comprehensible and
				structured form.
			</Typography>
			<Input
				label="Campaign Title"
				placeholder="e.g., April Ad Campaign to increase user number"
				bind:value={$campaignDetails.title}
				sizeVariant={EInputSizeVariant.MEDIUM}
			/>
			<TextArea
				label="Description"
				placeholder="Type here..."
				bind:value={$campaignDetails.description}
				sizeVariant={EInputSizeVariant.FULL_WIDTH}
			/>
		</div>
	</Container>
	<Container label="Election of governance">
		<div class="flex flex-col gap-5 w-full">
			<Typography variant="caption">
				In this step you can select the set of governance that you would like to involve in the
				process of your campaign. The governance are responsible for finding consensus about your
				airdrop eligibility criteria via Filament’s decentralized process even before you launch and
				distribute your token.
			</Typography>
			<Typography variant="caption">
				Your option here is to either involve all governance or evict up to three from the active
				set. The cost for evicting is calculated algorithmically by the Filament Hub depending on
				multiple factors such as t?: string | null;he voting power of a delegate.
			</Typography>
			<Input
				label="Max. evictable delegate"
				tooltipContent="This limitation is defined by the protocol governance and might change over time to adapt to changing requirements."
				placeholder="Type here..."
				sizeVariant={EInputSizeVariant.MEDIUM}
				value={3}
				disabled
			/>
			<Table {...activeDelegatesTable} />
			<Table {...evictedDelegatesTable} />
		</div>
	</Container>
</div>
