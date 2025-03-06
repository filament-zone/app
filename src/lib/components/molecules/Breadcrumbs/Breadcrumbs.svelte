<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Card, Typography } from '$lib/components';
	import type { TPathSegment } from '$lib/types';

	const pathSegments: TPathSegment[] = $derived.by(() => {
		const segments = page.url.pathname.split('/');
		return segments.map((segment: string) => ({
			segment: segment.replace(/-/g, ' '),
			path: page.url.pathname.slice(0, page.url.pathname.indexOf(segment) + segment.length)
		}));
	});

	const handleBreadcrumbClick = (segment: TPathSegment) => {
		if (segment.path && segment.path !== page.url.pathname) {
			goto(segment.path);
		}
	};
</script>

<div>
	<Card>
		<div class="flex flex-row">
			{#each pathSegments as segment, index}
				<div onclick={() => handleBreadcrumbClick(segment)} aria-hidden="true">
					<Typography variant="caption" classNames="mr-2 cursor-pointer capitalize"
						>{segment.segment}</Typography
					>
					{#if index > 0 && index !== pathSegments.length - 1}<Typography
							variant="caption"
							classNames="mr-2">></Typography
						>{/if}
				</div>
			{/each}
		</div>
	</Card>
</div>
