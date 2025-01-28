import { get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { CampaignApi, TransactionHubApiClient } from '$lib/api';
import { modalStore, toastsStore, transactionStore } from '$lib/features';
import { routes } from '$lib/constants';
import { generateMockEligibilityCriteria } from '$lib/features/campaign/mock/mock';
import {
	EModalVariant,
	type ErrorTransactionPayload,
	type ICampaign,
	type ICreateCampaignStore
} from '$lib/types';
import { ECampaignPhase } from '$lib/api/campaign/campaign.hub.api.enums';
import { ECampaignTimeSettings } from '$lib/api/campaign/campaign.hub.api.enums';
const initCampaignDetails: ICampaign = {
	id: 0n,
	campaigner: '',
	phase: ECampaignPhase.DRAFT,
	delegates: {},
	indexer: '',
	// // STEP 1 START
	title: '',
	description: '',
	evictions: [],
	numericPhase: 0, //TODO: ADD TO THE HUB API
	// // STEP 1 END

	// // STEP 2 START

	// TODO: need to be added to the hub api - timeSettings
	timeSettings: {
		selectedType: ECampaignTimeSettings.ONE_TIME,
		[ECampaignTimeSettings.ONE_TIME]: {
			date: ''
		},
		[ECampaignTimeSettings.RECURRING]: {
			startDate: '',
			endDate: '',
			interval: '',
			total: ''
		}
	},
	criteria: generateMockEligibilityCriteria(3),
	// // STEP 2 END

	// // STEP 3 START
	// TODO: need to be added to the hub api - visibility, relativeShare, totalAirDropSupply, tokenContractAddress, indexerPrice, indexerPriceUSD, bond
	visibility: 'public',
	relativeShare: '5',
	totalAirDropSupply: '5',
	tokenContractAddress: '5',
	indexerPrice: '5,150',
	indexerPriceUSD: '10,345',
	bond: '1'
	// // STEP 3 END
};

const campaignDetails = writable({ ...initCampaignDetails });

const { send } = toastsStore;

const toggleDelegate: ICreateCampaignStore['toggleDelegate'] = (delegateId: string) => {
	campaignDetails.update((details) => {
		const evictedIndex = details.evictions.indexOf(delegateId);

		if (evictedIndex === -1) {
			if (details.evictions.length === 3) {
				send({ message: 'You can only evict 3 delegates at a time' });
			} else {
				details.evictions.push(delegateId);
			}
		} else {
			details.evictions.splice(evictedIndex, 1);
		}
		return details;
	});
};

const clearCampaignDetails = () => {
	campaignDetails.set({ ...initCampaignDetails });
};

const createCampaign: ICreateCampaignStore['createCampaign'] = async () => {
	const { openModal, updateModalConfig } = modalStore;
	openModal({
		variant: EModalVariant.TRANSACTION_STATUS
	});

	const tx = await CampaignApi.createCampaign({
		title: get(campaignDetails).title as string,
		description: get(campaignDetails).description as string,
		criteria: get(campaignDetails).criteria,
		evictions: []
	});

	if (!tx?.txHash) {
		return;
	}

	const { addTransaction, updateTransaction } = transactionStore;
	addTransaction(tx?.txHash);
	updateModalConfig({ variant: EModalVariant.TRANSACTION_STATUS, state: { txHash: tx.txHash } });

	tx?.onSuccess(() => {
		let completed = false;
		let attempts = 0;
		updateTransaction(tx?.txHash as string, { isInSequencer: true });
		const interval = setInterval(async () => {
			attempts += 1;
			if (!tx.txHash) {
				return;
			}

			const res = await TransactionHubApiClient.getTxStatusLedger(tx.txHash);

			if (res.data?.receipt.result === 'successful') {
				send({ message: 'Campaign successfully created' });
				updateTransaction(tx?.txHash, { isInLedger: true });
				completed = true;
			}

			if (completed || attempts >= 5) {
				clearInterval(interval);

				if (!completed) {
					updateTransaction(tx?.txHash, { error: {} as ErrorTransactionPayload });
				}
				if (completed) {
					await goto(routes.CAMPAIGNS.MANAGE.ROOT);
				}
			}
		}, 1000);
	});

	tx.onFailure((payload) => {
		updateTransaction(tx?.txHash as string, { error: payload });
	});

	send({ message: 'Creating campaign... ' });
	tx?.run();
};

const getDelegates = async () => {
	return await CampaignApi.getDelegates();
};

export const campaignStore: ICreateCampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	getDelegates
};
