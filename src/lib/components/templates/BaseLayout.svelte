<script lang="ts">
	import { RightSideBarController, ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
</script>

<div class="base-layout flex flex-row h-svh">
	<div class="flex flex-col w-full h-fit items-center">
		<Header />
		<div
			class="base-layout-body flex flex-col w-full max-w-[1440px] lg:max-w-[1280px] justify-center overflow-auto overflow-x-hidden min-h-svh h-fit"
		>
			<div class="px-4 py-4 md:px-10 flex flex-col w-full min-h-svh h-fit pt-[12]">
				<slot />
			</div>
		</div>
		<Footer />
	</div>
	<RightSideBarController />
</div>
<ToastsContainer />
