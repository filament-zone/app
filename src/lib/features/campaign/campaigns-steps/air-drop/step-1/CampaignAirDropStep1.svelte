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
		tableLabel: 'Selected Delegates',
		data: [
			...$data.pageData.delegates.filter(
				(delegate: IDelegate) => !Object.keys($campaignDetails.delegates)?.includes(delegate.id)
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
				Object.keys($campaignDetails.delegates)?.includes(delegate.id)
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
	<Container label="Setup" variant="secondary">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>On this page you can start to setup your airdrop. Please provide a general description
				which introduces the campaign details. Try to write in a concise, comprehensible and
				structured form.
			</Typography>
			<Container variant="inner-container">
				<div class="flex flex-col gap-5 w-full">
					<Input
						label="Campaign Title"
						placeholder="Filament Airdrop Round 1"
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
		</div>
	</Container>
	<Container label="Election of delegates" variant="secondary">
		<div class="flex flex-col gap-5 w-full">
			<div class="flex flex-col gap-5 w-[95%] px-2">
				<Typography variant="caption">
					In this step you can select the set of delegates that you would like to involve in the
					process of your campaign. The delegates are responsible for voting on your airdrop
					proposal. They decide whether your airdrop criteria is accepted and gets distributed to
					the community or rejected.
				</Typography>
				<Typography variant="caption">
					You can <span class="font-bold text-rugged">evict up to three delegates</span> from the active
					set. The cost for evicting is shown in the table below and needs to be paid in FILA in the
					final step.
				</Typography>
			</div>
			<Container variant="inner-container">
				<div class="flex flex-col gap-5 w-full">
					<Table {...activeDelegatesTable} />
				</div>
			</Container>
			{#if evictedDelegatesTable.data.length > 0}
				<Container variant="inner-container">
					<Table {...evictedDelegatesTable} />
				</Container>
			{/if}
		</div>
	</Container>
</div>
