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
			label: `Delegates`,
			value: 'delegates',
			path: routes.DELEGATES.SUBPAGE_1.ROOT,
			subItems: [
				{
					label: 'subpage-1',
					value: 'delegates/subpage-1',
					path: routes.DELEGATES.SUBPAGE_1.ROOT
				},
				{
					label: 'subpage-2',
					value: 'delegates/subpage-2',
					path: routes.DELEGATES.SUBPAGE_2.ROOT
				},
				{
					label: 'subpage-3',
					value: 'delegates/subpage-3',
					path: routes.DELEGATES.SUBPAGE_3.ROOT
				}
			]
		},
		{
			label: 'Airdrops',
			value: 'campaigns',
			path: routes.CAMPAIGNS.ROOT,
			subItems: [
				{
					label: 'List',
					value: 'campaigns/list',
					path: routes.CAMPAIGNS.LIST.ROOT
				},
				{
					label: 'Create',
					value: 'campaigns/create',
					path: routes.CAMPAIGNS.CREATE.AIR_DROP.ROOT
				}
			]
		}
	];
</script>

<div class="flex flex-row">
	{#each menuConfig as item}
		<NavBarItem option={item} />
	{/each}
</div>
