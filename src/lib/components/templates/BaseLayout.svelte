<script lang="ts">
	import { ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
</script>

<div class="flex flex-col h-svh">
	<Header />
	<div class="h-full p-4">
		<slot />
	</div>
	<Footer />
</div>
<ToastsContainer />
