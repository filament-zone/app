<script lang="ts">
	import { page } from '$app/stores';
	import { SubPageMenuBar } from '$lib/components';
	import { routes } from '$lib/constants';

	$: hideSubPageMenuBar = $page?.url?.pathname.split('/')[3] === 'create-proposal';
</script>

<div>
	{#if !hideSubPageMenuBar}
		<SubPageMenuBar subPages={routes.PAGE_2} />
	{/if}
	<div class="pt-4">
		<slot />
	</div>
</div>
