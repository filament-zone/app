<script lang="ts">
	import { campaignStore, rightSideBarStore } from '$lib/features';
	import {
		Button,
		Container,
		Dropdown,
		Input,
		Table,
		Typography,
		DatePicker
	} from '$lib/components';
	import {
		CalendarMode,
		EDropdownSizeVariant,
		EInputSizeVariant,
		ERightSideBarVariant,
		type ICalendarProps
	} from '$lib/types';
	const { openRightSideBar } = rightSideBarStore;

	const { campaignDetails } = campaignStore;

	const handleChangeDateRange: ICalendarProps<CalendarMode.SINGLE>['onChange'] = (
		value: ICalendarProps<CalendarMode.SINGLE>['value']
	) => {
		campaignDetails.update((prev) => ({ ...prev, snapshotDate: value.date }));
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
				<Dropdown label="Shapshot Interval" sizeVariant={EDropdownSizeVariant.MEDIUM} />
				<Input
					label="Total Snapshots"
					placeholder="10"
					type="number"
					sizeVariant={EInputSizeVariant.MEDIUM}
				/>
			</div>
		</div>
	</Container>
	<Container label="Eligibility Criteria">
		<Button
			on:click={() => {
				openRightSideBar({ variant: ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA });
			}}>Open Sidebar</Button
		>
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				Via criterions you can define specific actions of a user that you want to reward with your
				airdrop. By allocating a weight to the actions, you can adjust the impact of each action on
				the users Airdrop allocation. Add criterions and click on the edit button of each item to
				configure the weights as preferred.
			</Typography>
			<Table />
		</div>
	</Container>
</div>
