<script>
	import { goto } from '$app/navigation';
	import { Button, Divider, NavBar } from '$lib/components';
	import { modalStore, Wallet, walletStore } from '$lib/features';
	import { shortCutTransactionHash } from '$lib/helpers';
	import { EButtonStyleVariant, EModalVariant } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg?url';
	import { routes } from '$lib/constants';
	import { Typography } from '$lib/components';

	const { openModal } = modalStore;
	const { wallet } = walletStore;

	let isWalletMenuOpen = false;
</script>

<div class="flex flex-col w-full sticky top-0 z-50">
	<div class="flex flex-row items-center h-[54px] px-4 bg-background" data-testid="header">
		<div
			class="cursor-pointer flex gap-3"
			on:click={() => {
				goto(routes.HOME);
			}}
			aria-hidden="true"
		>
			<img src={LogoFilament} alt="logo" class="w-6" />
			<Typography variant="h5">Filament</Typography>
		</div>

		<div class="ml-12 flex h-full items-center justify-middle">
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
				styleVariant={EButtonStyleVariant.HIGHLIGHT}
				>{$wallet.address ? shortCutTransactionHash($wallet.address) : 'Connect Wallet'}</Button
			>
			{#if isWalletMenuOpen}
				<div class="absolute right-0 top-[51px]">
					<Wallet bind:isOpen={isWalletMenuOpen} />
				</div>
			{/if}
		</div>
	</div>
	<Divider />
</div>
