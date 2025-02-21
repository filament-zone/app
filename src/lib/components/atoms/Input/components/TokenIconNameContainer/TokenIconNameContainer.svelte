<script lang="ts">
	import { type ITokenIconNameContainerProps } from '$lib/types';
	import { Typography } from '$lib/components';

	interface Props {
		tokenIcon: ITokenIconNameContainerProps['tokenIcon'];
		tokenTicker: ITokenIconNameContainerProps['tokenTicker'];
		[key: string]: any
	}

	let { ...props }: Props = $props();

	const SvelteComponent = $derived(tokenIcon);
</script>

<div class="token-icon-name-container" style={props.style}>
	<SvelteComponent width="12px" height="12px" />
	<Typography variant="button">{props.tokenTicker}</Typography>
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
		border: 0.5px solid var(--default-border);
		background: var(--background-100);
	}
</style>
