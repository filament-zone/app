<script lang="ts">
	import { ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
</script>

<div class="flex flex-col h-svh">
	<Header />
	<div class="flex w-full justify-center h-full">
		<div class="h-full p-4 overflow-scroll w-full max-w-[1440px]">
			<slot />
		</div>
	</div>
	<Footer />
</div>
<ToastsContainer />
