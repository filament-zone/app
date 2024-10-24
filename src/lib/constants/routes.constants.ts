export const routes = {
	HOME: '/',
	OVERVIEW: { ROOT: '/overview' },
	GOVERNANCE: {
		ROOT: '/governance',
		SUBPAGE_1: { ROOT: '/governance/subpage-1' },
		SUBPAGE_2: { ROOT: '/governance/subpage-2' },
		SUBPAGE_3: {
			ROOT: '/governance/subpage-3',
			CREATE_PROPOSAL: '/governance/subpage-3/create-proposal'
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
