<script>
	import { goto } from '$app/navigation';
	import { Button, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { campaignStore } from '$lib/features';

	const { createHubTx } = campaignStore;
	const testSendToHub = () => {
		createHubTx();
	};
</script>

<Typography>My Campaigns</Typography>
<Button
	on:click={() => {
		goto(routes.CAMPAIGNS.CREATE.AIR_DROP.ROOT);
	}}
>
	Create
</Button>
<Button on:click={testSendToHub}>Test Run</Button>
