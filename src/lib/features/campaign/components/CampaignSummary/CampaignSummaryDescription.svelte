<script lang="ts">
	// import DOMPurify from 'dompurify';
	import { Typography, TextCollapse } from '$lib/components';
	import type { ICampaignSummaryProps } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		campaign: ICampaignSummaryProps['campaign'];
	}

	let { campaign }: Props = $props();

	const mockDescription =
		'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae t quo voluptas nulla pariatur?';

	let sanitizedHTML: string;

	// onMount(() => {
	// 	sanitizedHTML = DOMPurify.sanitize(campaign?.description);
	// });
</script>

<TextCollapse>
	{#snippet label()}
		<div >
			<Typography variant="h6">Description</Typography>
		</div>
	{/snippet}
	{#snippet body()}
		<div >
			<!-- eslint-disable svelte/no-at-html-tags -->
			<Typography variant="caption"><div>{@html sanitizedHTML ?? mockDescription}</div></Typography>
		</div>
	{/snippet}
</TextCollapse>
