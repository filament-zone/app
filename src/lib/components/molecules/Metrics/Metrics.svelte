<script lang="ts">
	import { Container } from '$lib/components';

	let { children } = $props();
</script>

<Container label="Metrics">
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		{@render children?.()}
	</div>
</Container>
