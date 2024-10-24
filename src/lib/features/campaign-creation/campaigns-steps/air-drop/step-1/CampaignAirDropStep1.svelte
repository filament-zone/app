<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { flexRender } from '@tanstack/svelte-table';
	import { page } from '$app/stores';
	import { campaignStore, delegatesColumnDefCommon } from '$lib/features';
	import { Container, Input, Table, TextArea, Typography } from '$lib/components';
	import { EDelegateType, EInputSizeVariant, type IDelegate, type ITableProps } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import MinusCircleIcon from '$lib/assets/icons/minus-circle.svg?component';

	const data = derived(page, () => $page.data);

	const { campaignDetails, toggleDelegate } = campaignStore;

	onMount(() => {
		campaignDetails.update((prev) => ({
			...prev,
			title: $data.step1Data.title,
			description: $data.step1Data.description,
			maxEvictableDelegates: $data.step1Data.maxEvictableDelegates,
			selectedActiveDelegates: $data.step1Data.activeDelegatesTable.data
				.filter((delegate: IDelegate) => delegate.selected)
				.map((delegate: IDelegate) => delegate.id),
			selectedEvictedDelegates: $data.step1Data.evictedDelegatesTable.data
				.filter((delegate: IDelegate) => delegate.selected)
				.map((delegate: IDelegate) => delegate.id)
		}));
	});

	const delegateColumnDef: (delegateType: EDelegateType) => ITableProps['columnDef'] = (
		delegateType
	) => [
		...delegatesColumnDefCommon,
		{
			accessorKey: 'selected',
			header: '',
			cell: (value) => {
				const isSelected = value.getValue() as IDelegate['selected'];
				if (isSelected) {
					return flexRender(CheckmarkCircleIcon, { fill: 'var(--green-100)' });
				} else {
					return flexRender(MinusCircleIcon, {});
				}
			},
			size: 10,
			meta: {
				class: 'sticky',
				cellStyle: {
					cursor: 'pointer'
				},
				onClick: (cell) => {
					const selectedActiveDelegateId = cell.getContext().row.original.id as IDelegate['id'];
					toggleDelegate(selectedActiveDelegateId, delegateType);
				}
			}
		}
	];

	$: activeDelegatesTable = {
		...$data.step1Data.activeDelegatesTable,
		data: [
			...$data.step1Data.activeDelegatesTable.data
				.map((delegate: IDelegate) => {
					const selectedInStore = $campaignDetails.selectedActiveDelegates.includes(delegate.id);
					return { ...delegate, selected: selectedInStore };
				})
				.sort((a: IDelegate, b: IDelegate) => Number(b.votingPower) - Number(a.votingPower))
		],
		columnDef: delegateColumnDef(EDelegateType.ACTIVE)
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	$: evictedDelegatesTable = {
		...$data.step1Data.evictedDelegatesTable,
		data: [
			...$data.step1Data.evictedDelegatesTable.data
				.map((delegate: IDelegate) => {
					const selectedInStore = $campaignDetails.selectedEvictedDelegates.includes(delegate.id);
					return { ...delegate, selected: selectedInStore };
				})
				.sort((a: IDelegate, b: IDelegate) => Number(b.votingPower) - Number(a.votingPower))
		],
		columnDef: delegateColumnDef(EDelegateType.EVICTED)
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
		<div class="flex flex-col gap-5">
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
				label="Max. evictable governance"
				placeholder="Type here..."
				sizeVariant={EInputSizeVariant.MEDIUM}
				bind:value={$campaignDetails.maxEvictableDelegates}
			/>
			<Table {...activeDelegatesTable} />
			<Table {...evictedDelegatesTable} />
		</div>
	</Container>
</div>
