import type { CriteriaVote } from '@filament-zone/filament/CriteriaVote';
import { derived, get, writable } from 'svelte/store';
import {
	modalStore,
	toastsStore,
	transactionStore,
	voteTransactionModalConfig
} from '$lib/features';
import { CampaignApi } from '$lib/api';
import { ECampaignPhase, EModalVariant, type ICampaignDetailsStore } from '$lib/types';

const { send, update } = toastsStore;

const campaignDetails: ICampaignDetailsStore['campaignDetails'] = writable();
const campaignIdDerived: ICampaignDetailsStore['campaignIdDerived'] = derived(
	campaignDetails,
	($campaignDetails) => {
		return $campaignDetails?.id;
	}
);

const setCampaignDetails: ICampaignDetailsStore['setCampaignDetails'] = (campaign) => {
	campaignDetails.set(campaign);
};

const updateCampaignDetails: ICampaignDetailsStore['updateCampaignDetails'] = async () => {
	const campaignId = get(campaignIdDerived);
	if (campaignId === undefined) {
		return;
	}

	const campaignDataRes = await CampaignApi.getCampaignById(campaignId);

	if (!campaignDataRes?.data) {
		return;
	}

	campaignDetails.set(campaignDataRes.data);
};

const initCampaign: ICampaignDetailsStore['initCampaign'] = async (campaignId) => {
	if (campaignId === undefined) {
		return;
	}
	const { openModal, updateModalConfig } = modalStore;

	const tx = await CampaignApi.initCampaign({ campaign_id: campaignId });

	if (tx?.txHash) {
		send({
			id: tx.txHash,
			message: 'Initiating campaign...',
			display: false,
			options: {
				persistent: true,
				onClick: () => {
					openModal({
						variant: EModalVariant.TRANSACTION_STATUS,
						state: { txHash: tx?.txHash }
					});
				}
			}
		});
	}
	openModal({
		variant: EModalVariant.TRANSACTION_STATUS,
		state: { txHash: tx?.txHash }
	});

	if (!tx?.txHash) {
		return;
	}

	const { addTransaction } = transactionStore;
	addTransaction(tx?.txHash);

	tx?.onSuccess(() => {
		if (tx?.txHash) {
			update(tx.txHash, 'Campaign successfully initiated.');
		}
	});

	tx.onFailure(() => {
		if (tx?.txHash) {
			update(tx.txHash, 'Campaign initiating failed.');
		}

		updateModalConfig({
			variant: EModalVariant.TRANSACTION_STATUS,
			state: {
				txHash: tx?.txHash,
				config: {
					error: {
						title: 'Initiating Failed',
						description: 'Unable to initiate due to a failed transaction. Please try again.'
					}
				}
			}
		});
	});

	tx?.run();
};

const voteCampaignCriteria: ICampaignDetailsStore['voteCampaignCriteria'] = async (
	campaignId,
	voteOption
) => {
	if (campaignId === undefined) {
		return;
	}

	let payload: CriteriaVote;
	if (voteOption === 'Approved') {
		payload = { Approved: { weights: [1n] } };
	} else {
		payload = 'Rejected';
	}
	const { openModal, updateModalConfig } = modalStore;

	const tx = await CampaignApi.voteCampaignCriteria({
		campaign_id: campaignId,
		vote: payload
	});

	if (tx?.txHash) {
		send({
			id: tx.txHash,
			message: 'Voting campaign...',
			display: false,
			options: {
				persistent: true,
				onClick: () => {
					openModal({
						variant: EModalVariant.TRANSACTION_STATUS,
						state: { txHash: tx?.txHash, config: voteTransactionModalConfig }
					});
				}
			}
		});
	}

	openModal({
		variant: EModalVariant.TRANSACTION_STATUS,
		state: { txHash: tx?.txHash, config: voteTransactionModalConfig }
	});

	if (!tx?.txHash) {
		return;
	}
	const { addTransaction } = transactionStore;
	addTransaction(tx?.txHash);

	tx.onSuccess(async () => {
		if (tx?.txHash) {
			update(tx.txHash, 'Campaign successfully voted.');
		}
	});

	tx.onFailure(() => {
		if (tx?.txHash) {
			update(tx.txHash, 'Campaign voting failed.');
		}

		updateModalConfig({
			variant: EModalVariant.TRANSACTION_STATUS,
			state: {
				txHash: tx?.txHash,
				config: {
					error: {
						title: 'Vote Failed',
						description: 'Unable to vote due to a failed transaction. Please try again.'
					}
				}
			}
		});
	});

	await tx.run();
};

export const isCampaignOwner = (campaignOwner: string, walletAddress: string) => {
	return walletAddress?.toLowerCase() === campaignOwner?.toLowerCase();
};

export const isCampaignDelegate = (delegatesList: string[], walletAddress: string) => {
	if (!delegatesList || !walletAddress) {
		return false;
	}

	return delegatesList.map((item) => item.toLowerCase()).includes(walletAddress.toLowerCase());
};

export const isCriteriaVoteAccessibleFn: ICampaignDetailsStore['isCriteriaVoteAccessibleFn'] = (
	campaignPhase,
	isDelegate,
	walletAddress
) => {
	if (campaignPhase !== ECampaignPhase.CRITERIA) {
		return false;
	}

	if (!isDelegate) {
		return false;
	}

	if (!walletAddress) {
		return false;
	}

	return true;
};

export const campaignDetailsStore: ICampaignDetailsStore = {
	campaignDetails,
	campaignIdDerived,
	setCampaignDetails,
	initCampaign,
	updateCampaignDetails,
	voteCampaignCriteria,
	isCriteriaVoteAccessibleFn
};
