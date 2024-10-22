<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import {
		AddContractInput,
		campaignStore,
		checkIsCriteriaCompleted,
		RightSideBar,
		rightSideBarStore
	} from '$lib/features';
	import { Button, Dropdown, Input } from '$lib/components';
	import {
		type IEligibilityCriteria,
		type ICampaignCreationSidebarCriteriaState
	} from '$lib/types';
	import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';

	const data = derived(page, () => $page.data);

	const { activeRightSideBar, closeRightSideBar } = rightSideBarStore;
	const { campaignDetails } = campaignStore;

	$: sidebarState = $activeRightSideBar.state as ICampaignCreationSidebarCriteriaState;

	$: selectedCriteria = {} as IEligibilityCriteria;

	$: {
		if (sidebarState?.criteriaId) {
			selectedCriteria = {
				...$campaignDetails.criteria.find((criteria) => criteria.id === sidebarState?.criteriaId)
			} as IEligibilityCriteria;
		}
	}

	$: editableCriteriaState = writable<IEligibilityCriteria>(selectedCriteria);

	const handleSaveChanges = () => {
		editableCriteriaState.update((criteria) => {
			return {
				...criteria,
				completed: checkIsCriteriaCompleted(criteria)
			};
		});

		campaignDetails.update((details) => {
			if (sidebarState?.criteriaId) {
				const newCriteriaArr = details.criteria.map((criteria) =>
					criteria.id === $editableCriteriaState.id ? $editableCriteriaState : criteria
				);
				return { ...details, criteria: newCriteriaArr };
			} else {
				return { ...details, criteria: [...details.criteria, $editableCriteriaState] };
			}
		});

		closeRightSideBar();
	};
</script>

<RightSideBar>
	{#if selectedCriteria}
		<div class="flex flex-col justify-between h-full">
			<div class="flex flex-col gap-4">
				<Input label="Criterion Name" bind:value={$editableCriteriaState.name} />
				<Dropdown
					label="Criterion Type"
					bind:value={$editableCriteriaState.type}
					options={$data.step2Data.meta.eligibilityCriteriaTypeOptions}
				/>
				<div class="flex flex-row gap-2">
					<Input
						label="Mapping"
						bind:value={$editableCriteriaState.tvl}
						LeftIcon="$"
						RightIcon="TVL"
					/>
					<div class="mt-[43px]">
						<ArrowRight />
					</div>
					<Input
						labelGap
						bind:value={$editableCriteriaState.weight}
						LeftIcon="x"
						RightIcon="Weight"
					/>
				</div>
				<AddContractInput
					label="List of contracts"
					bind:contracts={$editableCriteriaState.contracts}
				/>
			</div>
			<Button class="self-end" on:click={handleSaveChanges}>Save Changes</Button>
		</div>
	{/if}
</RightSideBar>
