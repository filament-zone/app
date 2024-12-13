<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { campaignStore, RightSideBar, rightSideBarStore } from '$lib/features';
	import { Button, Dropdown, Input } from '$lib/components';

	import type { Criterion } from '@filament-zone/filament/Criterion';
	import { type IDropdownOption } from '$lib/types';

	const data = derived(page, () => $page.data);

	const { activeRightSideBar, closeRightSideBar } = rightSideBarStore;
	const { campaignDetails } = campaignStore;

	$: sidebarState = $activeRightSideBar.state as Criterion;

	$: selectedCriteria = { parameters: {} } as Criterion;

	$: {
		if (sidebarState?.name) {
			selectedCriteria = {
				...$campaignDetails.criteria.find((criteria) => criteria.name === sidebarState?.name)
			} as Criterion;
		}
	}

	$: editableCriteriaState = writable<Criterion>(selectedCriteria);

	const handleSaveChanges = () => {
		editableCriteriaState.update((criteria) => {
			return {
				...criteria
			};
		});

		campaignDetails.update((details) => {
			if (sidebarState?.name) {
				const newCriteriaArr = details.criteria.map((criteria) =>
					criteria.name === $editableCriteriaState.name ? $editableCriteriaState : criteria
				);
				return { ...details, criteria: newCriteriaArr };
			} else {
				return { ...details, criteria: [...details.criteria, $editableCriteriaState] };
			}
		});

		closeRightSideBar();
	};

	const handleDelete = () => {
		campaignDetails.update((details) => {
			const newCriteriaArr = details.criteria.filter(
				(criteria) => criteria.name !== $editableCriteriaState.name
			);
			return { ...details, criteria: newCriteriaArr };
		});
		closeRightSideBar();
	};

	$: categoryOptions = $data.pageData.step2Data.meta.eligibilityCriteriaCategoryOptions?.filter(
		(option: IDropdownOption) => option.value !== 'all'
	);

	const onWeightChange = (value: bigint) => {
		editableCriteriaState.update((criteria) => ({ ...criteria, weight: value }));
	};
</script>

<RightSideBar>
	{#if selectedCriteria}
		<div class="flex flex-col justify-between h-full">
			<div class="flex flex-col gap-4">
				<Input label="Criterion Name" bind:value={$editableCriteriaState.name} />
				<!--				<Dropdown-->
				<!--					label="Criterion Type"-->
				<!--					options={$data.step2Data.meta.eligibilityCriteriaTypeOptions}-->
				<!--					disabled-->
				<!--				/>-->
				<Dropdown
					label="Category"
					options={categoryOptions}
					bind:value={$editableCriteriaState.category}
				/>
				<div class="flex flex-row gap-2">
					<!--					<Input label="Mapping" LeftContent="$" RightIcon="TVL" />-->
					<!--					<div class="mt-[43px]">-->
					<!--						<ArrowRight />-->
					<!--					</div>-->
					<Input
						label="Weight"
						onInput={onWeightChange}
						LeftContent="x"
						RightIcon="Point(s)"
						type="bigint"
					/>
				</div>
				<!--				<AddContractInput label="List of contracts" />-->
			</div>
			<div class="flex flex-row justify-between">
				<Button class="self-end" on:click={handleDelete}>Delete</Button>
				<Button class="self-end" on:click={handleSaveChanges}>Save Changes</Button>
			</div>
		</div>
	{/if}
</RightSideBar>
