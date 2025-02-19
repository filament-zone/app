<script lang="ts">
	import { walletStore, Modal } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { EButtonSizeVariant } from '$lib/types';

	const { verifyAccount } = walletStore;
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">Verify your account</Typography>
	</div>
	<div slot="content" class="text-center flex flex-col gap-12">
		<Typography variant="h4">Choose verification method</Typography>
		<div class="flex flex-col items-center w-full gap-6">
			<Button
				sizeVariant={EButtonSizeVariant.FULL_WIDTH}
				on:click={() => {
					verifyAccount();
				}}>Xwitter</Button
			>
		</div>
	</div>
</Modal>
