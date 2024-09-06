<script>
	import { goto } from '$app/navigation';
	import { Button, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
</script>

<Typography>My Campaigns</Typography>
<Button
	on:click={() => {
		goto(routes.CAMPAIGNS.CREATE.AIR_DROP.ROOT);
	}}
>
	Create
</Button>
