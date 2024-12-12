<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignListItem } from '$lib/features';
	import { Button, Container, Toggle } from '$lib/components';
	import { routes } from '$lib/constants';
	import { EToggleVariant } from '$lib/types';

	export let data;

	$: toggleValue = 'all';
</script>

<Container label="Airdrops list">
	<div slot="header">
		<Button
			on:click={() => {
				goto(routes.CAMPAIGNS.CREATE.AIR_DROP.ROOT);
			}}
		>
			Create
		</Button>
	</div>
	<div class="flex flex-col w-full">
		<div class="flex justify-between gap-8 w-full mb-4">
			<Toggle
				options={data.campaignToggleOptions}
				variant={EToggleVariant.SECONDARY}
				bind:value={toggleValue}
			/>
		</div>
		<div class="flex flex-col gap-4 w-full">
			{#each data.campaignList as campaignItem}
				<CampaignListItem campaign={campaignItem} />
			{/each}
		</div>
	</div>
</Container>
