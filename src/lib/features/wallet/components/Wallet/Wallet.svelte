<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { Button, Typography } from '$lib/components';
	import { walletStore } from '$lib/features';
	import { type IWalletProps } from '$lib/types';

	let { isOpen = $bindable(false) }: IWalletProps = $props();

	const { disconnectWallet, wallet } = walletStore;

	let handleClickOutside = $derived(() => {
		isOpen = false;
	});
</script>

<div class="wallet-container" use:clickOutside={[]} onclickOutside={handleClickOutside}>
	<div>
		<Typography variant="h4">Wallet</Typography>
		<div class="flex flex-row">
			<Typography classNames="mr-4" variant="body1">Balance:</Typography>
			<Typography variant="body1"
				>{$wallet?.balance ? Number($wallet?.balance).toFixed(4) : '0.00'}</Typography
			>

			<Typography variant="body1">ETH</Typography>
		</div>
	</div>
	<div class="mt-8">
		<Button
			onclick={() => {
				disconnectWallet();
				isOpen = false;
			}}>Disconnect</Button
		>
	</div>
</div>

<style lang="less">
	@import '$lib/styles/layout.less';

	.wallet-container {
		display: flex;
		flex-direction: column;
		border: 0.5px solid var(--default-border);
		background: var(--darkNet);
		border-radius: 4px;
		padding: 14px;

		width: calc(100vw - 32px);

		@media @size_md {
			width: 390px;
		}
		color: var(--filaMint);
	}
</style>
