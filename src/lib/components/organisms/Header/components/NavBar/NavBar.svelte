<script lang="ts">
	import { NavBarItem } from '$lib/components';
	import { routes } from '$lib/constants';
	import type { INavBarItemOption } from '$lib/types';

	const menuConfig: INavBarItemOption[] = [
		{
			label: 'Overview',
			value: 'overview',
			path: routes.OVERVIEW.ROOT
		},
		{
			label: `Governance`,
			value: 'governance',
			path: routes.GOVERNANCE.SUBPAGE_1.ROOT,
			subItems: [
				{
					label: 'subpage-1',
					value: 'governance/subpage-1',
					path: routes.GOVERNANCE.SUBPAGE_1.ROOT
				},
				{
					label: 'subpage-2',
					value: 'governance/subpage-2',
					path: routes.GOVERNANCE.SUBPAGE_2.ROOT
				},
				{
					label: 'subpage-3',
					value: 'governance/subpage-3',
					path: routes.GOVERNANCE.SUBPAGE_3.ROOT
				}
			]
		},
		{
			label: 'Airdrops',
			value: 'campaigns',
			path: routes.CAMPAIGNS.ROOT,
			subItems: [
				{
					label: 'Manage',
					value: 'campaigns/manage',
					path: routes.CAMPAIGNS.MANAGE.ROOT
				},
				{
					label: 'Create',
					value: 'campaigns/create',
					path: routes.CAMPAIGNS.CREATE.AIR_DROP.ROOT
				},
				{
					label: 'Test The Hub Tx',
					value: 'campaigns/check-the-hub',
					path: routes.CAMPAIGNS.CHECK_THE_HUB.ROOT
				}
			]
		}
	];
</script>

<div class="flex flex-row h-full">
	{#each menuConfig as item}
		<NavBarItem option={item} />
	{/each}
</div>
