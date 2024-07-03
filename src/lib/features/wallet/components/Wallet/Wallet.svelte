<script lang="ts">
	import { Button, Typography } from '$lib/components';
	import { metamaskStore } from '$lib/features';
	import { type IWalletProps } from '$lib/types';

	export let isOpen: IWalletProps['isOpen'] = false;

	const { disconnect } = metamaskStore;
</script>

<div class="wallet-container">
	<div>
		<Typography variant="h4">Wallet</Typography>
	</div>
	<div class="mt-8">
		<Button
			on:click={() => {
				disconnect();
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
		box-shadow: 0 0 0 0.1px var(--primary-white);
		background: var(--content1);
		border-radius: 4px;
		padding: 8px;

		width: calc(100vw - 32px);

		@media @size_md {
			width: 390px;
		}
		color: var(--filaMint);
	}
</style>
