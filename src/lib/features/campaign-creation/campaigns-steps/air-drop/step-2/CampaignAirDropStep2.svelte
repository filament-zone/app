<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import moment from 'moment/moment.js';
	import { page } from '$app/stores';
	import { flexRender, type Row } from '@tanstack/svelte-table';
	import {
		campaignStore,
		rightSideBarStore,
		eligibilityCriteriaColumnDefCommon,
		checkIsCriteriaCompleted,
		HoverableCell
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
		ECampaignTimeSettings,
		EDropdownSizeVariant,
		EInputSizeVariant,
		ERightSideBarVariant,
		EToggleVariant,
		type ICalendarProps,
		type ICampaignCreationSidebarCriteriaState,
		type IEligibilityCriteria,
		type ITableProps
	} from '$lib/types';

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
				const isSettingsCircleGreen =
					!!$activeRightSideBar.state &&
					($activeRightSideBar.state as ICampaignCreationSidebarCriteriaState).criteriaId ===
						(value.row.original as IEligibilityCriteria).id;

				return flexRender(HoverableCell, {
					id: value.row.id,
					isCompleted,
					isSettingsCircleGreen
				});
			},
			size: 36,
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
		columnDef: [...eligibilityCriteriaColumnDef],
		onRowClick: (row: Row<IEligibilityCriteria>) => {
			const selectedCriteriaId = row.original.id as IEligibilityCriteria['id'];
			openRightSideBar({
				variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA,
				state: { criteriaId: selectedCriteriaId }
			});
		}
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	const handleChangeDateOneTime: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({ ...prev, snapshotDate: value.date }));
	};

	$: setSnapshotEndDate = () => {
		if (
			$campaignDetails.snapshotStartDateRecurring &&
			$campaignDetails.snapshotInterval &&
			$campaignDetails.snapshotTotal
		) {
			const value = moment($campaignDetails.snapshotStartDateRecurring).add(
				+$campaignDetails.snapshotInterval * +$campaignDetails.snapshotTotal,
				'days'
			);

			campaignDetails.update((prev) => ({
				...prev,
				snapshotEndDateRecurring: value.toLocaleString()
			}));
		} else {
			campaignDetails.update((prev) => ({
				...prev,
				snapshotEndDateRecurring: null
			}));
		}
	};

	const handleChangeDateRecurring: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({ ...prev, snapshotStartDateRecurring: value.date }));
		setSnapshotEndDate();
	};

	$: {
		setSnapshotEndDate();
	}

	const handleAddNewCriteria = () => {
		openRightSideBar({
			variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA
		});
	};
</script>

<div class="flex flex-col gap-5">
	<Container label="General">
		<div class="flex flex-col gap-5 w-full">
			<Typography variant="caption"
				>On this page you can design the airdrop criteria by allocating weights to specific user
				actions. Please start by selecting a start date and the number of snapshots to create.
			</Typography>
			<Toggle
				label="Time settings"
				bind:value={$campaignDetails.timeSettings}
				options={$data.step2Data.meta.timeSettingsOptions}
			/>
			{#if $campaignDetails.timeSettings === ECampaignTimeSettings.ONE_TIME}
				<DatePicker
					label="Snapshot Date"
					value={{ date: $campaignDetails.snapshotDate }}
					onChange={handleChangeDateOneTime}
				/>
			{:else if $campaignDetails.timeSettings === ECampaignTimeSettings.RECURRING}
				<div class="flex flex-row justify-between">
					<DatePicker
						label="Snapshot Start Date"
						value={{ date: $campaignDetails.snapshotStartDateRecurring }}
						onChange={handleChangeDateRecurring}
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

					<DatePicker
						label="Snapshot End Date"
						value={{ date: $campaignDetails.snapshotEndDateRecurring }}
						disabled
					/>
				</div>
			{/if}
		</div>
	</Container>
	<Container label="Eligibility Criteria">
		<div class="flex flex-col gap-5 w-full">
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
