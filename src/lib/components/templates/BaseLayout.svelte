<script lang="ts">
	import { RightSideBarController, ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
</script>

<div class="flex flex-row h-svh">
	<div class="flex flex-col w-full">
		<Header />
		<div class="flex w-full justify-center overflow-auto overflow-x-hidden h-full">
			<div class="p-4 w-full max-w-[1440px]">
				<slot />
			</div>
		</div>
		<Footer />
	</div>
	<RightSideBarController />
</div>
<ToastsContainer />
