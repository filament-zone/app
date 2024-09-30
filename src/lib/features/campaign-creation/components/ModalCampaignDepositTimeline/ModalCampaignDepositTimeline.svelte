<script lang="ts">
	import { Modal } from '$lib/features';
	import { Button, Typography } from '$lib/components';
</script>

<Modal classNames="max-w-96" closeOnClickOutside>
	<div slot="header" class="text-center">
		<Typography variant="h2">Deposit Campaign Collateral</Typography>
	</div>
	<div slot="content">
		<Button class="ml-auto mt-8" variant="secondary">Set Token Allowance</Button>
	</div>
</Modal>
