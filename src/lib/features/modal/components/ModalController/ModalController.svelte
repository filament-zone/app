<script>
	import { derived } from 'svelte/store';
	import {
		modalStore,
		navigationStore,
		ModalConfirmation,
		ModalConnectWallet,
		ModalValidatorStake,
		ModalCampaignInitiate,
		ModalCampaignDeposit
	} from '$lib/features';
	import { EModalVariant } from '$lib/types';

	const { beforeNavigate } = navigationStore;
	const { closeModal, activeModal } = modalStore;

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
			case EModalVariant.CAMPAIGN_INITIATE:
				return ModalCampaignInitiate;
			case EModalVariant.CAMPAIGN_DEPOSIT:
				return ModalCampaignDeposit;
			default:
				return null;
		}
	});
</script>

<div class="modal">
	<svelte:component this={$mainModal} />
</div>
