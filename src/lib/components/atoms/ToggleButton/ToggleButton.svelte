<script lang="ts">
	import { ChevronDownIcon } from 'svelte-feather-icons';

	interface Props {
		isOpen?: boolean;
		onClick?: any;
	}

	let { isOpen = false, onClick = () => {} }: Props = $props();
</script>

<div class="toggle-button-container" class:active={isOpen}>
	<button onclick={onClick} class={isOpen ? 'icon-open' : 'icon-closed'}>
		<ChevronDownIcon />
	</button>
</div>

<style lang="less">
	.toggle-button-container {
		display: flex;
		padding: 2px;
		width: fit-content;
		border-radius: 2px;
		cursor: pointer;
		color: var(--foreground);

		&.active,
		&:hover {
			background-color: var(--foreground);
			color: var(--darkNet);
		}

		.icon-open {
			transform: rotate(180deg);
			transition: transform 0.3s ease;
			width: 24px;
			height: 24px;
		}

		.icon-closed {
			transition: transform 0.3s ease;
			width: 24px;
			height: 24px;
		}
	}
</style>
