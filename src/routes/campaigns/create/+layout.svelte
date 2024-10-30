<script lang="ts">
	import { createStepBarStore, NavigationFooter, StepBar } from '$lib/features';
	import { PageHeader } from '$lib/components';
	import { setContext } from 'svelte';

	export let data;

	setContext('stepBarStore', createStepBarStore(data.initSteps));
</script>

<PageHeader label={`New Airdrop`} />
<StepBar />
<slot />
<NavigationFooter />
