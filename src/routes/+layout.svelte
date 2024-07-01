<script lang="ts">
	import { ModalController, navigationStore } from '$lib/features';
	import { BaseLayout } from '$lib/components';
	import '$lib/styles/app.less';

	const { navigating, previousPage } = navigationStore;
	navigating.subscribe(() => {
		if ($navigating?.from?.url.pathname) {
			previousPage.set($navigating.from.url.pathname);
		}
	});
</script>

<BaseLayout>
	<slot />
</BaseLayout>
<ModalController />
