<script lang="ts">
	import { RightSideBarController, ToastsContainer } from '$lib/features';
	import { Footer } from '$lib/components';
	import Header from '$lib/components/organisms/Header/Header.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-row h-svh">
	<div class="flex flex-col w-full">
		<Header />
		<div class="flex flex-col w-full items-center h-fit">
			<div class="flex flex-col p-4 py-8 w-full max-w-[1440px] min-h-dvh h-fit">
				{@render children?.()}
			</div>
			<div class="w-full flex justify-center">
				<Footer />
			</div>
		</div>
	</div>
	<RightSideBarController />
</div>
<ToastsContainer />
