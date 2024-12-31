<script lang="ts">
	import { fade } from 'svelte/transition';
	import { CampaignTimeLineItem } from '$lib/features';
	import { type ICampaignTimeLineProps } from '$lib/types';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';
	import ChevronRightIcon from '$lib/assets/icons/chevron-right.svg?component';
	import { Typography } from '$lib/components';

	export let options: ICampaignTimeLineProps['options'];
	export let isOpen: ICampaignTimeLineProps['isOpen'] = false;

	let isTimelineOpen = isOpen;

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};
</script>

<div>
	<div class="flex flex-row justify-between gap-4">
		<Typography variant="caption">Timeline:</Typography>
		<div
			class="cursor-pointer"
			style="color: var(--primary-white)"
			on:click={handleTimeLineClick}
			aria-hidden="true"
		>
			{#if isTimelineOpen}
				<ChevronRightIcon style="transform: scale(0.7);" />
			{:else}
				<ChevronDownIcon style="transform: scale(0.7);" />
			{/if}
		</div>
	</div>
	<div class="flex flex-col">
		<CampaignTimeLineItem {...options[0]} />
		{#if isTimelineOpen}
			<div transition:fade>
				{#each options.slice(1) as option}
					<CampaignTimeLineItem {...option} />
				{/each}
			</div>
		{/if}
	</div>
</div>
