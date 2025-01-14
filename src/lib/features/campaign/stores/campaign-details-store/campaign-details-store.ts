import type { CriteriaVote } from '@filament-zone/filament/CriteriaVote';
import { derived, get, writable } from 'svelte/store';
import { invalidateAll } from '$app/navigation';
import { toastsStore } from '$lib/features';
import { CampaignApi, TransactionHubApiClient } from '$lib/api';
import { type ICampaignDetailsStore } from '$lib/types';

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

	tx.onSuccess(() => {
		let completed = false;
		const interval = setInterval(async () => {
			if (!tx.txHash) {
				return;
			}

			const res = await TransactionHubApiClient.getTxStatusLedger(tx.txHash);

			if (res.data?.receipt.result === 'successful') {
				send({ message: 'Campaign successfully voted' });
				completed = true;
			}

			if (completed) {
				clearInterval(interval);
				await invalidateAll();
			}
		}, 1000);
	});
	send({ message: 'Voting campaign... ' });
	tx.run();
};

export const campaignDetailsStore: ICampaignDetailsStore = {
	campaignDetails,
	campaignIdDerived,
	setCampaignDetails,
	initCampaign,
	updateCampaignDetails,
	voteCampaignCriteria
};
