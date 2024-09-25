export const routes = {
	HOME: '/',
	OVERVIEW: { ROOT: '/overview' },
	DELEGATES: {
		ROOT: '/delegates',
		SUBPAGE_1: { ROOT: '/delegates/subpage-1' },
		SUBPAGE_2: { ROOT: '/delegates/subpage-2' },
		SUBPAGE_3: {
			ROOT: '/delegates/subpage-3',
			CREATE_PROPOSAL: '/delegates/subpage-3/create-proposal'
		}
	},
	CAMPAIGNS: {
		ROOT: '/campaigns',
		ALL: { ROOT: '/campaigns/all' },
		ACTIVE: { ROOT: '/campaigns/active' },
		FINISHED: { ROOT: '/campaigns/finished' },
		DRAFT: { ROOT: '/campaigns/draft' },
		CREATE: {
			ROOT: '/campaigns/create',
			AIR_DROP: { ROOT: `/campaigns/create/air-drop` }
		}
	}
};
