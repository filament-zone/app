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
		{#each Object.entries(subPages) as [key, subRoute]}
			{#if typeof subRoute === 'string'}
				{#if key !== 'ROOT'}
					<div class:selected={subRouteSelected(subRoute)}>
						<Typography
							dataTestId={subRoute}
							variant="h6"
							class="cursor-pointer selected capitalize"
							color={subRouteSelected(subRoute) ? 'var(--dark-net)' : 'var(--primary-white)'}
							on:click={handleSubRouteSelect.bind(null, subRoute)}
							>{subRoute.split('/')[2]}</Typography
						>
					</div>
				{/if}
			{:else}
				<div class:selected={subRouteSelected(subRoute.ROOT)}>
					<Typography
						dataTestId={subRoute.ROOT}
						variant="h6"
						class="cursor-pointer selected capitalize"
						color={subRouteSelected(subRoute.ROOT) ? 'var(--dark-net)' : 'var(--primary-white)'}
						on:click={handleSubRouteSelect.bind(null, subRoute.ROOT)}
						>{subRoute.ROOT.split('/')[2]}</Typography
					>
				</div>
			{/if}
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
