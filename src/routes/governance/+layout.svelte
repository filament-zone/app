<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { SubPageMenuBar } from '$lib/components';
	import { routes } from '$lib/constants';

	$: hideSubPageMenuBar = $page?.url?.pathname.split('/')[3] === 'create-proposal';

	beforeUpdate(() => {
		if ($page?.url?.pathname === routes.GOVERNANCE.ROOT) {
			goto(routes.GOVERNANCE.SUBPAGE_1.ROOT);
		}
	});
</script>

<div>
	{#if !hideSubPageMenuBar}
		<SubPageMenuBar subPages={routes.GOVERNANCE} />
	{/if}
	<div class="pt-4">
		<slot />
	</div>
</div>
