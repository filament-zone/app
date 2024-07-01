<script>
	import { Button } from '$lib/components';
	import { modalStore } from '$lib/features';
	import { EButtonColorVariant, EModalVariant } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg';

	const { openModal } = modalStore;
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-between items-center h-[72px] px-4">
		<div>
			<div class="logo">
				<img src={LogoFilament} alt="logo" />
			</div>
		</div>
		<div>
			<Button
				data-testid="connect-wallet-button"
				on:click={() => {
					openModal({ variant: EModalVariant.CONFIRMATION });
					console.log('Connect Wallet click');
				}}
				colorVariant={EButtonColorVariant.SECONDARY}>Connect Wallet</Button
			>
		</div>
	</div>
	<div class="divider" />
</div>

<style lang="less">
	.divider {
		width: 100%;
		height: 1px;
		box-shadow: 0 0 0 0.1px var(--gray-200);
		margin-bottom: 10px;
	}
</style>
