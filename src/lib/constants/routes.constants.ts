export const routes = {
	HOME: '/',
	OVERVIEW: { ROOT: '/overview' },
	GOVERNANCE: {
		ROOT: '/governance',
		PROPOSALS: { ROOT: '/governance/proposals' },
		STAKING: {
			ROOT: '/governance/staking',
			CREATE_PROPOSAL: '/governance/staking/create-proposal'
		}
	},
	CAMPAIGNS: {
		ROOT: '/campaigns',
		MANAGE: {
			ROOT: '/campaigns/manage',
			CREATE: { ROOT: '/campaigns/manage/create/:campaignType/:step' },
			EDIT: { ROOT: '/campaigns/manage/edit/:campaignId/:step' }
		},
		CAMPAIGN_ID: { ROOT: '/campaigns/:campaignId' },
		CHECK_THE_HUB: { ROOT: '/campaigns/check-the-hub' }
	}
};
