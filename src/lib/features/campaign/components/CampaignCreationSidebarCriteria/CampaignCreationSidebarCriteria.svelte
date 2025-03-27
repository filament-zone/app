<script lang="ts">
	import { page } from '$app/state';
	import { AddContractInput, campaignStore, RightSideBar, rightSideBarStore } from '$lib/features';
	import { Button, Dropdown, Input } from '$lib/components';
	import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';

	import type { Criterion } from '@filament-zone/filament/Criterion';
	import { type IDropdownOption, EButtonStyleVariant } from '$lib/types';
	import { EEligibilityCriteriaType } from '$lib/api/campaign/campaign.hub.api.enums';
	import { untrack } from 'svelte';

	const { activeRightSideBar, closeRightSideBar } = rightSideBarStore;
	const { campaignDetails } = campaignStore;

	let sidebarState = $state($activeRightSideBar.state as Criterion);
	let selectedCriteria = $state({ parameters: {} } as Criterion);

	$effect(() => {
		if (sidebarState?.name) {
			selectedCriteria = {
				...$campaignDetails.criteria.find((criteria) => criteria.name === sidebarState?.name)
			} as Criterion;
		}
	});

	let editableCriteriaState = $state<Criterion>(untrack(() => selectedCriteria));

	const handleSaveChanges = () => {
		editableCriteriaState = { ...editableCriteriaState };

		campaignDetails.update((details) => {
			if (sidebarState?.name) {
				const newCriteriaArr = details.criteria.map((criteria) =>
					criteria.name === sidebarState.name ? { ...editableCriteriaState } : criteria
				);
				return { ...details, criteria: newCriteriaArr };
			} else {
				return { ...details, criteria: [...details.criteria, { ...editableCriteriaState }] };
			}
		});

		closeRightSideBar();
	};

	const handleDelete = () => {
		campaignDetails.update((details) => {
			const newCriteriaArr = details.criteria.filter(
				(criteria) => criteria.name !== editableCriteriaState.name
			);
			return { ...details, criteria: newCriteriaArr };
		});
		closeRightSideBar();
	};

	let categoryOptions = $derived([
		...(page.data.pageData?.step2Data?.meta?.eligibilityCriteriaCategoryOptions || []).filter(
			(option: IDropdownOption) => option.value === 'defi'
		),
		{ value: 'moreSoon', label: 'More categories coming soon...', disabled: true }
	]);

	const onWeightChange = (value: bigint) => {
		editableCriteriaState = { ...editableCriteriaState, weight: value };
	};
</script>

<RightSideBar>
	{#if selectedCriteria}
		<div class="flex flex-col justify-between h-full gap-6">
			<div class="flex flex-col gap-4">
				<Input label="Name" bind:value={editableCriteriaState.name} />
				<Dropdown
					label="Environment"
					options={page.data.pageData.step2Data.meta.environmentOptions}
				/>
				<Dropdown
					label="Category"
					options={categoryOptions}
					bind:value={editableCriteriaState.category}
				/>
				<Dropdown
					label="Type"
					options={page.data.pageData.step2Data.meta.eligibilityCriteriaTypeOptions}
					value={EEligibilityCriteriaType.TVL_BY_CONTRACT}
					disabled={!editableCriteriaState.category}
				/>
				<div class="flex flex-row gap-2">
					<Input label="Mapping" LeftContent="$" RightIcon="TVL" />
					<div class="mt-[43px]">
						<ArrowRight />
					</div>
					<Input
						label="Weight"
						onInput={onWeightChange}
						LeftContent="x"
						RightIcon="Point(s)"
						type="bigint"
						textColor="var(--filaMint)"
					/>
				</div>
				<AddContractInput label="List of contracts" />
			</div>
			<div class="flex flex-row justify-between pb-4">
				<Button class="self-end" onclick={handleDelete} styleVariant={EButtonStyleVariant.NEGATIVE}
					>Delete</Button
				>
				<Button
					class="self-end"
					onclick={handleSaveChanges}
					styleVariant={EButtonStyleVariant.HIGHLIGHT}>Save Changes</Button
				>
			</div>
		</div>
	{/if}
</RightSideBar>
