<script lang="ts">
	import { type ITokenIconNameContainerProps } from '$lib/types';
	import { Typography } from '$lib/components';
	import type { Component } from 'svelte';

	let { tokenIcon, tokenTicker, styles }: ITokenIconNameContainerProps = $props();

	const SvelteComponent = tokenIcon as Component;
</script>

<div class="token-icon-name-container" style={styles}>
	<SvelteComponent width="12px" height="12px" />
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
		border: 0.5px solid var(--default-border);
		background: var(--background-100);
	}
</style>
