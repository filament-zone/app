import { get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { CampaignApi } from '$lib/api';
import { modalStore, toastsStore, transactionStore } from '$lib/features';
import { routes } from '$lib/constants';
import { generateMockEligibilityCriteria } from '$lib/features/campaign/mock/mock';
import { EModalVariant, type ICampaign, type ICreateCampaignStore } from '$lib/types';
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

const { send, update } = toastsStore;

const toggleDelegate: ICreateCampaignStore['toggleDelegate'] = (delegateId: string) => {
	campaignDetails.update((details) => {
		if (details.delegates[delegateId]) {
			delete details.delegates[delegateId];
		} else {
			const currentDelegatesCount = Object.keys(details.delegates).length;
			if (currentDelegatesCount === 3) {
				send({ message: 'You can only evict 3 delegates at a time' });
			} else {
				details.delegates[delegateId] = 1n;
			}
		}
		return details;
	});
};

const clearCampaignDetails = () => {
	campaignDetails.set({ ...initCampaignDetails });
};

const createCampaign: ICreateCampaignStore['createCampaign'] = async () => {
	const { openModal, updateModalConfig } = modalStore;

	const tx = await CampaignApi.createCampaign({
		title: get(campaignDetails).title as string,
		description: get(campaignDetails).description as string,
		criteria: get(campaignDetails).criteria,
		evictions: []
	});

	if (tx?.txHash) {
		send({
			id: tx.txHash,
			message: 'Creating campaign...',
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
			update(tx.txHash, 'Campaign successfully created.');
		}

		setTimeout(async () => {
			await goto(routes.CAMPAIGNS.MANAGE.ROOT);
		}, 2000);
	});

	tx.onFailure(() => {
		if (tx?.txHash) {
			update(tx.txHash, 'Campaign creation failed.');
		}
		updateModalConfig({
			variant: EModalVariant.TRANSACTION_STATUS,
			state: {
				txHash: tx?.txHash,
				config: {
					error: {
						title: 'Creation Failed',
						description: 'Unable to create campaign due to a failed transaction. Please try again.'
					}
				}
			}
		});
	});

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
