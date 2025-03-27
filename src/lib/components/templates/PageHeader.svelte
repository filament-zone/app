<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Typography } from '$lib/components';

	interface IPageHeaderProps {
		label?: string;
		children?: Snippet;
	}

	let { label = '', children }: IPageHeaderProps = $props();
</script>

<div class="page-header-wrapper flex items-center justify-center w-full">
	<div class="page-header max-w-screen-2xl">
		<Typography variant="h4">{label}</Typography>
		<div>
			{@render children?.()}
		</div>
	</div>
</div>

<style lang="less">
	.page-header {
		display: flex;
		flex-grow: 1;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		height: 54px;
		min-height: 54px;
	}
</style>
