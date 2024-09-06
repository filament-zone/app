<script>
	import { Typography } from '$lib/components';
	export let label = '';
</script>

<div class="page-header-wrapper flex items-center justify-center w-full border-b border-default">
	<div class="page-header mx-6 3xl:mx-0 max-w-screen-2xl">
		<Typography variant="h5">{label}</Typography>
		<div>
			<slot />
		</div>
	</div>
</div>

<style lang="less">
	.page-header-wrapper {
		position: sticky;
		top: 0;
		background: var(--content1);
		z-index: 10;
	}

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
