<script lang="ts">
	import { RightSideBarController, ToastsContainer } from '$lib/features';
	import { Header, Footer } from '$lib/components';
	import { InfoBanner, EInfoBannerStyleVariant } from '$lib/components/molecules';
</script>

<div class="flex flex-row h-svh">
	<div class="flex flex-col w-full">
		<Header />

		<div class="flex flex-col w-full items-center h-fit">
			<div class="flex flex-col p-4 py-8 w-full max-w-[1440px] min-h-dvh h-fit">
				<InfoBanner
					id="devnetBanner"
					title="Public Alpha"
					description="You're viewing data from our development environment. This version allows you to explore the UI while testnet deployment is in progress."
					styleVariant={EInfoBannerStyleVariant.RUGGED}
				/>
				<slot />
			</div>
			<div class="w-full flex justify-center">
				<Footer />
			</div>
		</div>
	</div>
	<RightSideBarController />
</div>
<ToastsContainer />
