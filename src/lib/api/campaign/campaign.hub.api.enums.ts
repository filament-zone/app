export enum ECampaignType {
	AIR_DROP = 'air-drop'
}

export enum EEligibilityCriteriaType {
	TVL_BY_CONTRACT = 'tvl-by-contract',
	VOLUME_BY_CONTRACT = 'volume-by-contract',
	LIQUIDITY_PROVIDER = 'liquidity-provider'
}

export enum ENetwork {
	ETHEREUM = 'ethereum',
	ARPITRUM = 'arpitrum',
	SCROLL = 'scroll'
}

export enum ECampaignTimeSettings {
	ONE_TIME = 'ONE_TIME',
	RECURRING = 'RECURRING'
}

export enum ECampaignPhase {
	DRAFT = 'Draft',
	CRITERIA = 'Criteria',
	DATA_INDEXING = 'Data Indexing',
	DISTRIBUTION_VOTING = 'Distribution Voting',
	TOKEN_DISTRIBUTION = 'Token Distribution'
}
