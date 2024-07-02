<script>
	import { Button } from '$lib/components';
	import { metamaskStore, modalStore } from '$lib/features';
	import { shortCutTransactionHash } from '$lib/helpers';
	import { EButtonColorVariant, EModalVariant } from '$lib/types';
	import LogoFilament from '$lib/assets/logos/logo-filament.svg';

	const { openModal } = modalStore;
	const { signer } = metamaskStore;
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
					if (!$signer?.address) {
						openModal({ variant: EModalVariant.CONNECT_WALLET });
					}
				}}
				colorVariant={EButtonColorVariant.SECONDARY}
				>{$signer?.address ? shortCutTransactionHash($signer?.address) : 'Connect Wallet'}</Button
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
