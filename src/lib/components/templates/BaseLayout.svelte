<script lang="ts">
	import { ToastsContainer } from '$lib/features';
	import { Header } from '$lib/components';
</script>

<div class="flex flex-col h-svh">
	<Header />
	<slot />
</div>
<ToastsContainer />
