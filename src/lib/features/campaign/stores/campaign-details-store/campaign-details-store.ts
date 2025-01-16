import type { CriteriaVote } from '@filament-zone/filament/CriteriaVote';
import { derived, get, writable } from 'svelte/store';
import { invalidateAll } from '$app/navigation';
import {
	modalStore,
	toastsStore,
	transactionStore,
	voteTransactionModalConfig
} from '$lib/features';
import { CampaignApi, TransactionHubApiClient } from '$lib/api';
import { EModalVariant, type ICampaignDetailsStore } from '$lib/types';

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

	const tx = await CampaignApi.initCampaign({ campaign_id: campaignId });

	tx?.onSuccess(() => {
		let completed = false;
		const interval = setInterval(async () => {
			if (!tx.txHash) {
				return;
			}

			const res = await TransactionHubApiClient.getTxStatusLedger(tx.txHash);

			if (res.data?.receipt.result === 'successful') {
				send({ message: 'Campaign successfully initiated' });
				completed = true;
			}

			if (completed) {
				clearInterval(interval);
				await invalidateAll();
			}
		}, 1000);
	});
	send({ message: 'Initiating campaign... ' });
	tx?.run();
};

const voteCampaignCriteria: ICampaignDetailsStore['voteCampaignCriteria'] = async (
	campaignId,
	voteOption
) => {
	const { openModal } = modalStore;
	if (campaignId === undefined) {
		return;
	}

	let payload: CriteriaVote;
	if (voteOption === 'Approved') {
		payload = { Approved: { weights: [1n] } };
	} else {
		payload = 'Rejected';
	}

	const tx = await CampaignApi.voteCampaignCriteria({
		campaign_id: campaignId,
		vote: payload
	});

	if (!tx?.txHash) {
		return;
	}

	openModal({
		variant: EModalVariant.TRANSACTION_STATUS,
		state: { config: voteTransactionModalConfig, txHash: tx?.txHash }
	});

	const { addTransaction, updateTransaction } = transactionStore;
	addTransaction(tx?.txHash);

	const txStatusWebSocket = TransactionHubApiClient.wsTxStatusSequencer(tx?.txHash);

	txStatusWebSocket.onOpen(() => {
		console.log('onOpen');
	});

	txStatusWebSocket.addMessageHandler((message) => {
		console.log('messageHandler', message);
	});

	await txStatusWebSocket.connect();

	tx.onSuccess(() => {
		let completed = false;
		updateTransaction(tx?.txHash as string, { isInSequencer: true });

		const interval = setInterval(async () => {
			if (!tx.txHash) {
				return;
			}

			const res = await TransactionHubApiClient.getTxStatusLedger(tx.txHash);

			if (res.data?.receipt.result === 'successful') {
				send({ message: 'Campaign successfully voted' });
				updateTransaction(tx?.txHash, { isInLedger: true });
				completed = true;
			}

			if (completed) {
				clearInterval(interval);
				await invalidateAll();
			}
		}, 1000);
	});
	send({ message: 'Voting campaign... ' });

	await tx.run();
};

export const isCampaignOwner = (campaignOwner: string, walletAddress: string) => {
	return walletAddress?.toLowerCase() === campaignOwner?.toLowerCase();
};

export const isCampaignDelegate = (delegatesList: string[], walletAddress: string) => {
	return delegatesList?.map((item) => item.toLowerCase()).includes(walletAddress?.toLowerCase());
};

export const isCriteriaVoteAccessibleFn: ICampaignDetailsStore['isCriteriaVoteAccessibleFn'] = (
	campaignPhase,
	isDelegate,
	walletAddress
) => {
	if (campaignPhase !== 'Criteria') {
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
