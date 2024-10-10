<script>
	import { Button } from '$lib/components';
	import { campaignStore } from '$lib/features';

	const { createHubTx } = campaignStore;
	const testSendToHub = () => {
		createHubTx();
	};
</script>

<Button on:click={testSendToHub}>Test Run the hub tx</Button>
