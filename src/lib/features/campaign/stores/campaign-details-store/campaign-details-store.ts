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

const { send } = toastsStore;

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
	openModal({
		variant: EModalVariant.TRANSACTION_STATUS
	});
	const tx = await CampaignApi.initCampaign({ campaign_id: campaignId });

	if (!tx?.txHash) {
		return;
	}

	const { addTransaction } = transactionStore;
	addTransaction(tx?.txHash);
	updateModalConfig({ variant: EModalVariant.TRANSACTION_STATUS, state: { txHash: tx.txHash } });

	tx?.onSuccess(() => {
		send({ message: 'Campaign successfully initiated.' });
	});

	tx.onFailure(() => {
		send({ message: 'Campaign initiating failed.' });
	});

	send({ message: 'Initiating campaign... ' });
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
	openModal({
		variant: EModalVariant.TRANSACTION_STATUS,
		state: { config: voteTransactionModalConfig }
	});

	const tx = await CampaignApi.voteCampaignCriteria({
		campaign_id: campaignId,
		vote: payload
	});

	if (!tx?.txHash) {
		return;
	}
	const { addTransaction } = transactionStore;
	addTransaction(tx?.txHash);
	updateModalConfig({
		variant: EModalVariant.TRANSACTION_STATUS,
		state: { txHash: tx?.txHash, config: voteTransactionModalConfig }
	});

	tx.onSuccess(async () => {
		send({ message: 'Campaign successfully voted.' });
	});

	tx.onFailure(() => {
		send({ message: 'Campaign voting failed.' });
	});

	send({ message: 'Voting campaign...' });

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
