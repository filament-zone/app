<script lang="ts">
	import { NavBarItem } from '$lib/components';
	import { routes } from '$lib/constants';
	import type { INavBarItemOption } from '$lib/types';
	import { replaceUrlParams } from '$lib/helpers';

	const menuConfig: INavBarItemOption[] = [
		{
			label: 'Overview',
			value: 'overview',
			path: routes.OVERVIEW.ROOT
		},
		{
			label: `Governance`,
			value: 'governance',
			path: routes.GOVERNANCE.PROPOSALS.ROOT,
			subItems: [
				{
					label: 'Proposals',
					value: 'governance/proposals',
					path: routes.GOVERNANCE.PROPOSALS.ROOT
				},
				{
					label: 'Staking',
					value: 'governance/staking',
					path: routes.GOVERNANCE.STAKING.ROOT
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
					value: 'campaigns/manage/create',
					path: replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
						campaignType: 'air-drop',
						step: '1'
					})
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
