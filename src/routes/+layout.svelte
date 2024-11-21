<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { ModalController, navigationStore, walletStore } from '$lib/features';
	import { BaseLayout } from '$lib/components';
	import { readFromLocalStorage } from '$lib/utils';
	import { EWalletProvider } from '$lib/services';
	import '$lib/styles/app.less';

	const { navigating, previousPage } = navigationStore;
	const { initializeWallet } = walletStore;

	navigating.subscribe(() => {
		if ($navigating?.from?.url.pathname) {
			previousPage.set($navigating.from.url.pathname);
		}
	});

	Chart.register(...registerables);

	onMount(() => {
		const prevWallet = readFromLocalStorage('prevWallet') as EWalletProvider | null;
		if (prevWallet) {
			initializeWallet(prevWallet);
		}
	});
</script>

<BaseLayout>
	<slot />
</BaseLayout>
<ModalController />
