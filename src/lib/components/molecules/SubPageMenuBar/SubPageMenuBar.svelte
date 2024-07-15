<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Divider, Typography } from '$lib/components';
	import type { ISubPageMenuBarProps } from '$lib/types';

	export let subPages: ISubPageMenuBarProps['subPages'];

	$: subRouteSelected = (route: string) => {
		return $page?.url?.pathname.split('/')[2] === route?.split('/')[2];
	};

	const handleSubRouteSelect = (route: string) => {
		goto(route);
	};
</script>

<div>
	<div class="flex flex-row gap-4">
		{#each Object.values(subPages) as subRoute}
			<div class:selected={subRouteSelected(subRoute)}>
				<Typography
					dataTestId={subRoute}
					variant="h6"
					class="cursor-pointer selected capitalize"
					color={subRouteSelected(subRoute) ? 'var(--dark-net)' : 'var(--primary-white)'}
					on:click={handleSubRouteSelect.bind(null, subRoute)}>{subRoute.split('/')[2]}</Typography
				>
			</div>
		{/each}
	</div>
	<Divider />
</div>

<style lang="less">
	.selected {
		background-color: var(--filaMint);
		padding: 0 8px;
	}
</style>
