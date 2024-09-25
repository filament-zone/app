<script>
	import { goto } from '$app/navigation';
	import { Button, Container, Toggle } from '$lib/components/';
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
	<div class="flex justify-between gap-8 w-full">
		<Toggle
			options={data.campaignToggleOptions}
			variant={EToggleVariant.SECONDARY}
			bind:value={toggleValue}
		/>
	</div>
</Container>
