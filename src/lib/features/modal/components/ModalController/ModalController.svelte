<script>
	import { derived } from 'svelte/store';
	import {
		modalStore,
		navigationStore,
		ModalConfirmation,
		ModalConnectWallet,
		ModalValidatorStake
	} from '$lib/features';
	import { EModalVariant } from '$lib/types';

	const { beforeNavigate } = navigationStore;
	const { closeModal } = modalStore;

	const { activeModal } = modalStore;

	beforeNavigate(() => {
		closeModal();
	});

	const mainModal = derived(activeModal, () => {
		switch ($activeModal) {
			case EModalVariant.CLOSED:
				return null;
			case EModalVariant.CONFIRMATION:
				return ModalConfirmation;
			case EModalVariant.CONNECT_WALLET:
				return ModalConnectWallet;
			case EModalVariant.VALIDATOR_STAKE:
				return ModalValidatorStake;
			default:
				return null;
		}
	});
</script>

<div class="modal">
	<svelte:component this={$mainModal} />
</div>
