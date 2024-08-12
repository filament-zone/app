<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { SubPageMenuBar } from '$lib/components';
	import { routes } from '$lib/constants';

	$: hideSubPageMenuBar = $page?.url?.pathname.split('/')[3] === 'create-proposal';

	beforeUpdate(() => {
		if ($page?.url?.pathname === routes.PAGE_2.ROOT) {
			goto(routes.PAGE_2.SUBPAGE_1.ROOT);
		}
	});
</script>

<div>
	{#if !hideSubPageMenuBar}
		<SubPageMenuBar subPages={routes.PAGE_2} />
	{/if}
	<div class="pt-4">
		<slot />
	</div>
</div>
