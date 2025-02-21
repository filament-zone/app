<script lang="ts">
	import { Container } from '$lib/components';

	let { children } = $props();
</script>

{#snippet mainSlot()}
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		{@render children?.()}
	</div>
{/snippet}

<Container label="Metrics" class="w-full" {mainSlot} />
