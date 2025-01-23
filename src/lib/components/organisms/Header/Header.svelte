<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { Button, Divider, NavBar } from '$lib/components';
	import { modalStore, Wallet, walletStore } from '$lib/features';
	import { shortCutTransactionHash, replaceUrlParams, screenDetect } from '$lib/helpers';
	import { EButtonStyleVariant, EModalVariant } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg?url';
	import { routes } from '$lib/constants';
	import { Typography } from '$lib/components';

	const { openModal } = modalStore;
	const { wallet } = walletStore;

	let isWalletMenuOpen = false;
	let isMobileMenuOpen = false;

	const screenTypeStore = screenDetect();

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};
</script>

<div class="flex flex-col w-full sticky top-0 z-50 bg-background">
	<div class="h-[5px]">
		<ProgressBar color="#b1ffe3" />
	</div>
	<div class="flex flex-row items-center justify-between pt-[5px] px-4" data-testid="header">
		<div
			class="cursor-pointer flex gap-3 pb-[10px]"
			on:click={() => {
				goto(routes.HOME);
			}}
			aria-hidden="true"
		>
			<img src={LogoFilament} alt="logo" class="w-6" />
			<Typography variant="h5">Filament</Typography>
		</div>
		{#if $screenTypeStore.isMounted}
			{#if !$screenTypeStore.isLayoutLg}
				<button
					class="hamburger"
					on:click={toggleMobileMenu}
					aria-label="Toggle menu"
					data-testid="mobile-nav-bar-button"
				>
					<div class={isMobileMenuOpen ? 'line open' : 'line'}></div>
					<div class={isMobileMenuOpen ? 'line open' : 'line'}></div>
				</button>
			{:else}
				<div class="absolute left-1/2 transform -translate-x-1/2">
					<NavBar />
				</div>
				<div class="ml-4 pb-[10px] flex gap-4">
					<Button
						styleVariant={EButtonStyleVariant.HIGHLIGHT}
						on:click={() => {
							goto(
								replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
									campaignType: 'air-drop',
									step: '1'
								})
							);
						}}
					>
						New Campaign
					</Button>
					<Button
						data-testid="connect-wallet-button"
						on:click={() => {
							if (!$wallet.address) {
								openModal({ variant: EModalVariant.CONNECT_WALLET });
							} else {
								isWalletMenuOpen = !isWalletMenuOpen;
							}
						}}
						styleVariant={EButtonStyleVariant.PRIMARY}
					>
						{$wallet.address ? shortCutTransactionHash($wallet.address) : 'Connect Wallet'}
					</Button>
					{#if isWalletMenuOpen}
						<div class="absolute right-0 top-[51px]">
							<Wallet bind:isOpen={isWalletMenuOpen} />
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
	{#if isMobileMenuOpen}
		<div class="mobile-menu" transition:fade>
			<div class="flex w-full justify-start items-center h-12 mb-4 gap-2">
				<img src={LogoFilament} alt="logo" class="w-6" />
				<Typography variant="h5">Filament</Typography>
			</div>
			<NavBar />
			<p class="opacity-70">Please use a desktop to connect your wallet or manage campaigns.</p>
		</div>
	{/if}
	<Divider />
</div>

<style>
	.hamburger {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 12px;
		z-index: 1000;
	}

	.line {
		width: 26px;
		height: 1px;
		background-color: white;
		transition: transform 0.3s ease;
	}

	.line.open:nth-child(1) {
		transform: rotate(45deg) translate(9px, 0px);
		height: 2px;
	}

	.line.open:nth-child(2) {
		transform: rotate(-45deg) translate(9px, 0px);
		height: 2px;
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--darkNet);
		padding: 16px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mobile-menu p {
		margin-top: auto;
		text-align: center;
		padding: 16px;
	}
</style>
