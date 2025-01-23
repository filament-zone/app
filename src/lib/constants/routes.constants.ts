export const routes = {
	HOME: '/',
	OVERVIEW: { ROOT: '/overview' },
	GOVERNANCE: { ROOT: '/governance' },
	CAMPAIGNS: {
		ROOT: '/campaigns',
		MANAGE: {
			ROOT: '/campaigns/manage',
			CREATE: { ROOT: '/campaigns/manage/create/:campaignType/:step' }
		},
		CAMPAIGN_ID: { ROOT: '/campaigns/:campaignId' },
		CHECK_THE_HUB: { ROOT: '/campaigns/check-the-hub' }
	},
	STAKING: { ROOT: '/staking' }
};
