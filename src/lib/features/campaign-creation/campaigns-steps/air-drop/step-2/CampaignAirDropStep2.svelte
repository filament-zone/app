<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { flexRender } from '@tanstack/svelte-table';
	import {
		campaignStore,
		rightSideBarStore,
		eligibilityCriteriaColumnDefCommon,
		checkIsCriteriaCompleted
	} from '$lib/features';
	import {
		Container,
		Dropdown,
		Input,
		Table,
		Typography,
		DatePicker,
		Toggle,
		Button
	} from '$lib/components';
	import {
		CalendarMode,
		EDropdownSizeVariant,
		EInputSizeVariant,
		ERightSideBarVariant,
		EToggleVariant,
		type ICalendarProps,
		type ICampaignCreationSidebarCriteriaState,
		type IEligibilityCriteria,
		type ITableProps
	} from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import SettingsCircleIcon from '$lib/assets/icons/settings-circle.svg?component';
	import SettingsCircleGreenIcon from '$lib/assets/icons/settings-circle-green.svg?component';

	const data = derived(page, () => $page.data);
	const { openRightSideBar, activeRightSideBar } = rightSideBarStore;
	const { campaignDetails } = campaignStore;

	onMount(() => {
		campaignDetails.update((prev) => ({
			...prev,
			snapshotDate: $data.step2Data.snapshotDate,
			snapshotInterval: $data.step2Data.snapshotInterval,
			snapshotTotal: $data.step2Data.snapshotTotal,
			criteria: $data.step2Data.eligibilityCriteriaTable.data.map((item: IEligibilityCriteria) => {
				return {
					...item,
					completed: checkIsCriteriaCompleted(item)
				};
			})
		}));
	});

	$: eligibilityCriteriaColumnDef = [
		...eligibilityCriteriaColumnDefCommon,
		{
			accessorKey: 'completed',
			header: ' ',
			cell: (value) => {
				const isCompleted = value.getValue() as IEligibilityCriteria['completed'];

				if (isCompleted) {
					return flexRender(CheckmarkCircleIcon, {});
				}

				if (
					!!$activeRightSideBar.state &&
					($activeRightSideBar.state as ICampaignCreationSidebarCriteriaState).criteriaId ===
						(value.row.original as IEligibilityCriteria).id
				) {
					return flexRender(SettingsCircleGreenIcon, {});
				}
				return flexRender(SettingsCircleIcon, {});
			},
			size: 10,
			meta: {
				cellStyle: {
					cursor: 'pointer'
				},
				onClick: (cell) => {
					const selectedCriteriaId = cell.getContext().row.original
						.id as IEligibilityCriteria['id'];
					openRightSideBar({
						variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA,
						state: { criteriaId: selectedCriteriaId }
					});
				}
			}
		}
	] as ITableProps['columnDef'];

	$: toggleValue = 'all';

	$: eligibilityCriteriaTable = {
		...$data.step2Data.eligibilityCriteriaTable,
		data: [
			...$campaignDetails.criteria
				.filter((item) => {
					if (toggleValue === 'all') {
						return true;
					}
					if (toggleValue === item.category) {
						return true;
					}
				})
				.map((criteria) => {
					return {
						...criteria,
						completed: checkIsCriteriaCompleted(criteria)
					};
				})
		],
		columnDef: [...eligibilityCriteriaColumnDef]
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	const handleChangeDateRange: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({ ...prev, snapshotDate: value.date }));
	};

	const handleAddNewCriteria = () => {
		openRightSideBar({
			variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA
		});
	};
</script>

<div class="flex flex-col gap-5">
	<Container label="General">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>On this page you can design the airdrop criteria by allocating weights to specific user
				actions. Please start by selecting a start date and the number of snapshots to create.
			</Typography>
			<div class="flex flex-row justify-between">
				<DatePicker
					label="Snapshot Date"
					value={{ date: $campaignDetails.snapshotDate }}
					onChange={handleChangeDateRange}
				/>
				<Dropdown
					label="Snapshot Interval"
					sizeVariant={EDropdownSizeVariant.MEDIUM}
					options={$data.step2Data.meta.snapshotIntervalOptions}
					bind:value={$campaignDetails.snapshotInterval}
				/>
				<Input
					label="Total Snapshots"
					placeholder="10"
					type="number"
					sizeVariant={EInputSizeVariant.MEDIUM}
					bind:value={$campaignDetails.snapshotTotal}
					LeftIcon="#"
				/>
			</div>
		</div>
	</Container>
	<Container label="Eligibility Criteria">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				Via criterions you can define specific actions of a user that you want to reward with your
				airdrop. By allocating a weight to the actions, you can adjust the impact of each action on
				the users Airdrop allocation. Add criterions and click on the edit button of each item to
				configure the weights as preferred.
			</Typography>
			<Toggle
				options={$data.step2Data.meta.eligibilityCriteriaCategoryOptions}
				variant={EToggleVariant.SECONDARY}
				bind:value={toggleValue}
			/>
			<Table {...eligibilityCriteriaTable} />
			<Button class="self-end" on:click={handleAddNewCriteria}>Add New Criteria</Button>
		</div>
	</Container>
</div>
