export const routes = {
	HOME: '/',
	PAGE_1: { ROOT: '/page-1' },
	PAGE_2: {
		ROOT: '/page-2',
		SUBPAGE_1: { ROOT: '/page-2/subpage-1' },
		SUBPAGE_2: { ROOT: '/page-2/subpage-2' },
		SUBPAGE_3: {
			ROOT: '/page-2/subpage-3',
			CREATE_PROPOSAL: '/page-2/subpage-3/create-proposal'
		}
	},
	PAGE_3: { ROOT: '/page-3' }
};
