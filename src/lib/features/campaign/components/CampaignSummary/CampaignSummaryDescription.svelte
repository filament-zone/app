<script lang="ts">
	import DOMPurify from 'dompurify';
	import { Typography, TextCollapse } from '$lib/components';
	import type { ICampaignSummaryProps } from '$lib/types';
	import { onMount } from 'svelte';

	export let campaign: ICampaignSummaryProps['campaign'];

	const mockDescription =
		'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae t quo voluptas nulla pariatur?';

	let sanitizedHTML: string;

	onMount(() => {
		sanitizedHTML = DOMPurify.sanitize(campaign?.description);
	});
</script>

<TextCollapse>
	<div slot="label">
		<Typography variant="h6">Description</Typography>
	</div>
	<div slot="body">
		<!-- eslint-disable svelte/no-at-html-tags -->
		<Typography variant="caption"><div>{@html sanitizedHTML ?? mockDescription}</div></Typography>
	</div>
</TextCollapse>
