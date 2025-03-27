<script lang="ts">
	import { ToggleButton } from '$lib/components';
	import type { ITextCollapseProps } from '$lib/types';

	let { label, children }: ITextCollapseProps = $props();

	let isOpen = $state(false);

	const toggle = () => {
		isOpen = !isOpen;
	};
</script>

<div class="text-collapse">
	<div class="flex w-full justify-between">
		{@render label?.()}
		<ToggleButton {isOpen} onclick={toggle} />
	</div>
	<div class="text-collapse {isOpen ? 'text-open' : 'text-closed'}">
		{@render children?.()}
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
