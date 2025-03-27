<script lang="ts">
	import moment from 'moment/moment.js';
	import { page } from '$app/state';
	import { renderComponent, type Row } from '@tanstack/svelte-table';
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
		type ITableProps
	} from '$lib/types';
	import type { Criterion } from '@filament-zone/filament/Criterion';

	const { openRightSideBar, activeRightSideBar } = rightSideBarStore;
	const { campaignDetails } = campaignStore;

	$: eligibilityCriteriaColumnDef = [
		...eligibilityCriteriaColumnDefCommon,
		{
			accessorKey: 'completed',
			header: ' ',
			cell: (value) => {
				const isCompleted = checkIsCriteriaCompleted(value.row.original as Criterion);
				const isSettingsCircleGreen =
					!!$activeRightSideBar.state &&
					($activeRightSideBar.state as ICampaignCreationSidebarCriteriaState).name ===
						(value.row.original as Criterion).name;

				return renderComponent(HoverableCell, {
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
					const selectedCriteriaName = cell.getContext().row.original.name as Criterion['name'];
					openRightSideBar({
						variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA,
						state: { name: selectedCriteriaName }
					});
				}
			}
		}
	] as ITableProps['columnDef'];

	$: toggleValue = 'all';

	$: eligibilityCriteriaTable = {
		tableLabel: '',
		data: [
			...$campaignDetails.criteria.filter((item) => {
				const isCompleted = checkIsCriteriaCompleted(item);
				if (toggleValue === 'all' && isCompleted) {
					return true;
				}
				if (toggleValue === item.category && isCompleted) {
					return true;
				}
			})
		],
		columnDef: [...eligibilityCriteriaColumnDef],
		onRowClick: (row: Row<Criterion>) => {
			const selectedCriteriaName = row.original.name as Criterion['name'];
			openRightSideBar({
				variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA,
				state: { name: selectedCriteriaName }
			});
		}
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	const handleChangeDateOneTime: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({
			...prev,
			timeSettings: {
				...prev.timeSettings,
				[ECampaignTimeSettings.ONE_TIME]: {
					...prev.timeSettings[ECampaignTimeSettings.ONE_TIME],
					date: value.date
				}
			}
		}));
	};

	$: setSnapshotEndDate = () => {
		if (
			$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING]?.startDate &&
			$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING]?.interval &&
			$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING]?.total
		) {
			const value = moment(
				$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].startDate
			).add(
				+$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].interval *
					+$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].total,
				'days'
			);

			campaignDetails.update((prev) => ({
				...prev,
				timeSettings: {
					...prev.timeSettings,
					[ECampaignTimeSettings.RECURRING]: {
						...prev.timeSettings[ECampaignTimeSettings.RECURRING],
						endDate: value.toLocaleString()
					}
				}
			}));
		} else {
			campaignDetails.update((prev) => ({
				...prev,
				timeSettings: {
					...prev.timeSettings,
					[ECampaignTimeSettings.RECURRING]: {
						...prev.timeSettings[ECampaignTimeSettings.RECURRING],
						endDate: null
					}
				}
			}));
		}
	};

	const handleChangeDateRecurring: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({
			...prev,
			timeSettings: {
				...prev.timeSettings,
				[ECampaignTimeSettings.RECURRING]: {
					...prev.timeSettings[ECampaignTimeSettings.RECURRING],
					startDate: value.date
				}
			}
		}));
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
	<Container label="Snapshots" variant="secondary">
		<div class="flex flex-col gap-5 w-full">
			<Typography variant="caption"
				>On this page you can design the airdrop criteria by allocating weights to specific user
				actions. Please start by selecting a start date and the number of snapshots to create.
			</Typography>
			<Container variant="inner-container">
				<div class="flex flex-col gap-5 w-full">
					<Toggle
						label="Snapshot Schedule"
						bind:value={$campaignDetails.timeSettings.selectedType}
						options={page.data.pageData.step2Data.meta.timeSettingsOptions}
					/>
					{#if $campaignDetails.timeSettings.selectedType === ECampaignTimeSettings.ONE_TIME}
						<DatePicker
							label="Snapshot Date"
							value={{ date: $campaignDetails.timeSettings['ONE_TIME'].date }}
							onChange={handleChangeDateOneTime}
						/>
					{:else if $campaignDetails.timeSettings.selectedType === ECampaignTimeSettings.RECURRING}
						<div class="flex flex-row justify-between gap-5">
							<DatePicker
								label="First Snapshot"
								value={{
									date: $campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].startDate
								}}
								onChange={handleChangeDateRecurring}
							/>
							<Dropdown
								label="Snapshot Interval"
								sizeVariant={EDropdownSizeVariant.MEDIUM}
								options={page.data.pageData.step2Data.meta.snapshotIntervalOptions}
								bind:value={$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].interval}
							/>
							<Input
								label="Total Snapshots"
								type="number"
								sizeVariant={EInputSizeVariant.MEDIUM}
								bind:value={$campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].total}
								LeftContent="#"
							/>
							<DatePicker
								label="Last Snapshot"
								value={{
									date: $campaignDetails.timeSettings[ECampaignTimeSettings.RECURRING].endDate
								}}
								disabled
							/>
						</div>
					{/if}
				</div>
			</Container>
		</div>
	</Container>

	<Container label="Eligibility Criteria" variant="secondary">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				Via criterions you can define specific actions of a user that you want to reward with your
				airdrop. By allocating a weight to the actions, you can adjust the impact of each action on
				the users Airdrop allocation. Add criterions and click on the edit button of each item to
				configure the weights as preferred.
			</Typography>
			<div>
				<Toggle
					options={page.data.pageData.step2Data.meta.eligibilityCriteriaCategoryOptions}
					variant={EToggleVariant.SECONDARY}
					bind:value={toggleValue}
				/>
				<Container variant="inner-container">
					<div class="flex flex-col gap-5 w-full">
						<Table {...eligibilityCriteriaTable} tableEmptyMessage="Please add a first criterion" />
						<Button class="self-end" onclick={handleAddNewCriteria}>Add New Criterion</Button>
					</div>
				</Container>
			</div>
		</div>
	</Container>
</div>
