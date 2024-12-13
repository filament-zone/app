<script lang="ts">
	import { createStepBarStore, NavigationFooter, StepBar } from '$lib/features';
	import { PageHeader } from '$lib/components';
	import { setContext } from 'svelte';

	export let data;

	setContext('stepBarStore', createStepBarStore(data.layoutData.initSteps));
</script>

<div class="flex flex-col h-full">
	<PageHeader label={`New Airdrop`} />
	<StepBar />
	<slot />
	<NavigationFooter />
</div>
