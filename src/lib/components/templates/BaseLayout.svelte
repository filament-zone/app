<script lang="ts">
	import { RightSideBarController, ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
</script>

<div class="flex flex-row h-svh">
	<div class="flex flex-col w-full">
		<Header />
		<div class="flex flex-col w-full h-[calc(100svh-55px)] items-center">
			<div class="p-4 w-full max-w-[1440px]">
				<slot />
			</div>
			<div class="w-full mt-auto">
				<Footer />
			</div>
		</div>
	</div>
	<RightSideBarController />
</div>
<ToastsContainer />
