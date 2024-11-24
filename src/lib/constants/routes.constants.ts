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
		MANAGE: { ROOT: '/campaigns/manage' },
		CREATE: {
			ROOT: '/campaigns/create',
			AIR_DROP: { ROOT: `/campaigns/create/air-drop` }
		},
		CHECK_THE_HUB: { ROOT: '/campaigns/check-the-hub' }
	}
};
