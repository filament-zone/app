<script lang="ts">
	import { onMount } from 'svelte';
	import { metamaskStore, ModalController, navigationStore } from '$lib/features';
	import { BaseLayout } from '$lib/components';
	import '$lib/styles/app.less';

	const { navigating, previousPage } = navigationStore;
	const { initMetamask } = metamaskStore;

	navigating.subscribe(() => {
		if ($navigating?.from?.url.pathname) {
			previousPage.set($navigating.from.url.pathname);
		}
	});

	onMount(() => {
		initMetamask();
	});
</script>

<BaseLayout>
	<slot />
</BaseLayout>
<ModalController />
