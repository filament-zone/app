<script lang="ts">
	import { browser } from '$app/environment';
	import { walletStore, Modal } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { EButtonSizeVariant, EWalletProvider } from '$lib/types';

	const { initializeWallet } = walletStore;
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">Connect Wallet</Typography>
	</div>
	<div slot="content" class="text-center flex flex-col gap-12">
		<Typography variant="h4">Choose wallet to connect</Typography>
		<div class="flex flex-col items-center w-full gap-6">
			<Button
				data-testid="connect-metamask"
				sizeVariant={EButtonSizeVariant.FULL_WIDTH}
				on:click={() => {
					if (!window?.ethereum?.isMetaMask) {
						if (browser) {
							window.open(`https://metamask.app.link/dapp/${window.location.host}`, '_blank');
						}
					} else {
						initializeWallet(EWalletProvider.METAMASK);
					}
				}}>MetaMask</Button
			>
		</div>
	</div>
</Modal>
