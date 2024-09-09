<script lang="ts">
	import { derived } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { CampaignCreationSidebarCriteria, rightSideBarStore } from '$lib/features';
	import { ERightSideBarVariant } from '$lib/types';

	const { activeRightSideBar } = rightSideBarStore;

	const rightSideBar = derived(activeRightSideBar, () => {
		switch ($activeRightSideBar.variant) {
			case ERightSideBarVariant.CLOSED:
				return null;
			case ERightSideBarVariant.CAMPAIGN_CREATION_SIDEBAR_CRITERIA:
				return CampaignCreationSidebarCriteria;
			default:
				return null;
		}
	});
</script>

<div class="h-full">
	{#if $rightSideBar}
		<div transition:slide={{ delay: 250, duration: 300, axis: 'x' }} class="h-full">
			<svelte:component this={$rightSideBar} />
		</div>
	{/if}
</div>
