<script>
	import { goto } from '$app/navigation';
	import { Button, NavBar } from '$lib/components';
	import { modalStore, Wallet, walletStore } from '$lib/features';
	import { shortCutTransactionHash } from '$lib/helpers';
	import { EButtonColorVariant, EModalVariant } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg';
	import { routes } from '$lib/constants';

	const { openModal } = modalStore;
	const { wallet } = walletStore;

	let isWalletMenuOpen = false;
</script>

<div class="flex flex-col">
	<div class="flex flex-row items-center h-[72px] px-4" data-testid="header">
		<div
			class="cursor-pointer"
			on:click={() => {
				goto(routes.HOME);
			}}
			aria-hidden="true"
		>
			<img src={LogoFilament} alt="logo" />
		</div>
		<div class="ml-4">
			<NavBar />
		</div>
		<div class="relative ml-auto">
			<Button
				data-testid="connect-wallet-button"
				on:click={() => {
					if (!$wallet.address) {
						openModal({ variant: EModalVariant.CONNECT_WALLET });
					} else {
						isWalletMenuOpen = !isWalletMenuOpen;
					}
				}}
				colorVariant={EButtonColorVariant.SECONDARY}
				>{$wallet.address ? shortCutTransactionHash($wallet.address) : 'Connect Wallet'}</Button
			>
			{#if isWalletMenuOpen}
				<div class="absolute right-0 top-[51px]">
					<Wallet bind:isOpen={isWalletMenuOpen} />
				</div>
			{/if}
		</div>
	</div>
	<div class="divider" />
</div>

<style lang="less">
	.divider {
		width: 100%;
		box-shadow: 0 0 0 0.3px var(--gray-200);
		margin-bottom: 10px;
	}
</style>
