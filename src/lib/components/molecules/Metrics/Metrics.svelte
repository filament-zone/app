<script lang="ts">
	import { Container } from '$lib/components';
</script>

<Container label="Metrics" class="w-full">
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		<slot />
	</div>
</Container>
