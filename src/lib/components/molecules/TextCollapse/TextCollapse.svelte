<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?url';

	export let collapsedHeight: string = '100px';
	export let expandedHeight: string = 'auto';
	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher();

	function toggle() {
		isOpen = !isOpen;
		dispatch('toggle', { isOpen });
	}
</script>

<div
	class="text-collapse"
	style="height: {isOpen ? expandedHeight : collapsedHeight}; box-shadow: {isOpen
		? 'none'
		: '0 4px 6px rgba(0, 0, 0, 0.1)'};"
>
	<slot />
	<button on:click={toggle} class="toggle-button">
		<img src={ChevronDownIcon} alt="Toggle" class={isOpen ? 'icon-open' : 'icon-closed'} />
	</button>
</div>

<style>
	.text-collapse {
		overflow: hidden;
		transition:
			height 0.3s ease,
			box-shadow 0.3s ease;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.toggle-button {
		position: absolute;
		bottom: 0;
		right: 0;
		background: none;
		border: none;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.icon-open {
		filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(120deg);
		transform: rotate(180deg);
		transition: transform 0.3s ease;
	}

	.icon-closed {
		filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(120deg);
		transition: transform 0.3s ease;
	}
</style>
