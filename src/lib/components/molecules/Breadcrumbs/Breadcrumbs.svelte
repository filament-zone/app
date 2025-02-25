<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { derived, type Readable } from 'svelte/store';
	import { Card, Typography } from '$lib/components';
	import type { TPathSegment } from '$lib/types';
	interface Props {
		[key: string]: any
	}

	let { ...props }: Props = $props();

	const pathSegments: Readable<TPathSegment[]> = derived(page, ($page) => {
		const segments = $page.url.pathname.split('/');
		return segments.map((segment) => ({
			segment: segment.replace(/-/g, ' '),
			path: $page.url.pathname.slice(0, $page.url.pathname.indexOf(segment) + segment.length)
		}));
	});

	const handleBreadcrumbClick = (segment: TPathSegment) => {
		if (segment.path && segment.path !== $page.url.pathname) {
			goto(segment.path);
		}
	};
</script>

<div class={props.class}>
	<Card>
		<div class="flex flex-row">
			{#each $pathSegments as segment, index}
				<div class="">
					<Typography
						variant="caption"
						class="mr-2 cursor-pointer capitalize"
						on:click={() => handleBreadcrumbClick(segment)}>{segment.segment}</Typography
					>
					{#if index > 0 && index !== $pathSegments.length - 1}<Typography
							variant="caption"
							class="mr-2">></Typography
						>{/if}
				</div>
			{/each}
		</div>
	</Card>
</div>
