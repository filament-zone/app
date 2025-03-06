<script lang="ts">
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';
	import { Typography, TextCollapse } from '$lib/components';
	import { type ICampaignSummaryProps } from '$lib/types';

	interface ICampaignSummaryDescriptionProps {
		campaign: ICampaignSummaryProps['campaign'];
	}

	let { campaign }: ICampaignSummaryDescriptionProps = $props();

	const mockDescription =
		'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae t quo voluptas nulla pariatur?';

	let sanitizedHTML = $state('');

	onMount(() => {
		sanitizedHTML = DOMPurify.sanitize(campaign?.description);
	});
</script>

<TextCollapse>
	{#snippet label()}
		<div>
			<Typography variant="h6">Description</Typography>
		</div>
	{/snippet}
	<div>
		<!-- eslint-disable svelte/no-at-html-tags -->
		<Typography variant="caption"
			><div>{@html sanitizedHTML.replace('editor', '') ?? mockDescription}</div></Typography
		>
	</div>
</TextCollapse>
