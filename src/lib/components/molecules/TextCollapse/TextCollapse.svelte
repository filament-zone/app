<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {} from '$lib/components';
	export let isOpen: boolean = false;
	import { ToggleButton } from '$lib/components/atoms/ToggleButton';

	const dispatch = createEventDispatcher();

	function toggle() {
		isOpen = !isOpen;
		dispatch('toggle', { isOpen });
	}
</script>

<div class="text-collapse">
	<div class="flex w-full justify-between">
		<slot name="label" />
		<ToggleButton {isOpen} onClick={toggle} />
	</div>
	<div class="text-collapse {isOpen ? 'text-open' : 'text-closed'}">
		<slot name="body" />
	</div>
</div>

<style lang="less">
	.text-collapse {
		overflow: hidden;
		transition: height 0.3s ease;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;

		&.text-open {
			height: fit-content;
		}
		&.text-closed {
			max-height: 65px;
			height: fit-content;
			position: relative;

			&::after {
				margin-top: 30px;
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				box-shadow: inset -20px -15px 17px 7px var(--background-300);
				pointer-events: none;
			}
		}
	}
</style>
