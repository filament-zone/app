<script lang="ts">
	import { NavBarItem } from '$lib/components';
	import { routes } from '$lib/constants';
	import type { INavBarItemOption } from '$lib/types';

	const menuConfig: INavBarItemOption[] = [
		{
			label: 'page1',
			value: 'page1',
			path: routes.PAGE_1.ROOT
		},
		{
			label: `page2`,
			value: 'page2',
			path: routes.PAGE_2.SUBPAGE_1.ROOT,
			subItems: [
				{
					label: 'subpage-1',
					value: 'page-2/subpage-1',
					path: routes.PAGE_2.SUBPAGE_1.ROOT
				},
				{
					label: 'subpage-2',
					value: 'page-2/subpage-2',
					path: routes.PAGE_2.SUBPAGE_2.ROOT
				},
				{
					label: 'subpage-3',
					value: 'page-2/subpage-3',
					path: routes.PAGE_2.SUBPAGE_3.ROOT
				}
			]
		},
		{
			label: 'page3',
			value: 'page3',
			path: routes.PAGE_3.ROOT
		}
	];
</script>

<div class="flex flex-row">
	{#each menuConfig as item}
		<NavBarItem option={item} />
	{/each}
</div>
