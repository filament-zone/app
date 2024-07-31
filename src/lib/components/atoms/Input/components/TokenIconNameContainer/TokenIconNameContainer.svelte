<script lang="ts">
	import { type ITokenIconNameContainerProps } from '$lib/types';
	import { Typography } from '$lib/components';

	export let tokenIcon: ITokenIconNameContainerProps['tokenIcon'];
	export let tokenTicker: ITokenIconNameContainerProps['tokenTicker'];
</script>

<div class="token-icon-name-container" style={$$props.style}>
	<svelte:component this={tokenIcon} width="12px" height="12px" />
	<Typography variant="button">{tokenTicker}</Typography>
</div>

<style>
	.token-icon-name-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 2px;
		padding: 0 8px;
		border-radius: 4px 0 0 4px;
		box-shadow: 0 0 0 0.3px var(--gray-200);
		background: var(--background-100);
		border-left: 0;
		height: 30px;
	}
</style>
