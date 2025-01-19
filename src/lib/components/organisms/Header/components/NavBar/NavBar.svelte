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
			label: 'Airdrops',
			value: 'campaigns',
			path: routes.CAMPAIGNS.ROOT
		},

		{
			label: `Staking`,
			value: 'staking',
			path: routes.STAKING.ROOT
		},
		{
			label: `Governance`,
			value: 'governance',
			path: routes.GOVERNANCE.ROOT
		}
	];
</script>

<div
	class="flex flex-col md:flex-row h-full w-full md:w-fit items-center justify-center gap-4 md:gap-0"
>
	{#each menuConfig as item}
		<NavBarItem option={item} />
	{/each}
</div>
