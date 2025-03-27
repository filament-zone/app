<script lang="ts">
	import { setContext } from 'svelte';
	import { createStepBarStore, NavigationFooter, StepBar } from '$lib/features';
	import { PageHeader } from '$lib/components';

	let { data, children } = $props();

	setContext('stepBarStore', createStepBarStore(data.layoutData.initSteps));
</script>

<div class="flex flex-col h-full">
	<PageHeader label={`New Airdrop Campaign`} />
	<StepBar />
	{@render children?.()}
	<NavigationFooter />
</div>
