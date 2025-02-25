<script>
	import {
		modalStore,
		navigationStore,
		ModalConfirmation,
		ModalConnectWallet,
		ModalValidatorStake,
		ModalCampaignInitiate,
		ModalCampaignDeposit,
		ModalCampaignInitiateTimeline,
		ModalCampaignVote,
		ModalTransactionTimeLine
	} from '$lib/features';
	import { EModalVariant } from '$lib/types';

	const { beforeNavigate } = navigationStore;
	const { closeModal, activeModal } = modalStore;

	beforeNavigate(() => {
		closeModal();
	});

	const Modal = $derived.by(() => {
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
			case EModalVariant.CAMPAIGN_DEPOSIT_TIMELINE:
				return ModalCampaignInitiateTimeline;
			case EModalVariant.CAMPAIGN_DEPOSIT:
				return ModalCampaignDeposit;
			case EModalVariant.CAMPAIGN_VOTE:
				return ModalCampaignVote;
			case EModalVariant.TRANSACTION_STATUS:
				return ModalTransactionTimeLine;
			default:
				return null;
		}
	});
</script>

<div class="modal">
	{#if $activeModal !== EModalVariant.CLOSED}
		<Modal />
	{/if}
</div>
