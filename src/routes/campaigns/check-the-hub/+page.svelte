<script>
	import { Button } from '$lib/components';
	import { campaignStore } from '$lib/features';

	const { sendTestHubTx } = campaignStore;
</script>

<Button on:click={sendTestHubTx}>Test Run the hub tx</Button>
