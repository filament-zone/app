<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { clickOutside } from '$lib/actions';
	import type { IMenuPopoverProps } from '$lib/types';

	export let width: IMenuPopoverProps['width'];
	export let maxHeight: IMenuPopoverProps['maxHeight'] = '';

	let isOpen = false;

	const onClickOutside = () => {
		isOpen = false;
	};

	const adjustPopoverPosition = (popover: HTMLElement) => {
		const rect = popover.getBoundingClientRect();
		const parentRect = popover.parentElement?.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		if (!parentRect) {
			return;
		}

		let left = (parentRect.width - rect.width) / 4;
		popover.style.left = `${left}px`;

		const adjustedRect = popover.getBoundingClientRect();

		if (adjustedRect.left < 0) {
			popover.style.left = `${left - adjustedRect.left}px`;
		} else if (adjustedRect.right > viewportWidth) {
			popover.style.left = `${left - (adjustedRect.right - viewportWidth)}px`;
		}
	};

	afterUpdate(() => {
		if (isOpen) {
			const popover = document.querySelector('.menu-popover');
			if (popover) {
				adjustPopoverPosition(popover as HTMLElement);
			}
		}
	});

	const openPopover = () => {
		isOpen = true;
	};
</script>

<div class="relative w-fit">
	<div on:click={openPopover} aria-hidden="true">
		<slot name="trigger" />
	</div>
	{#if isOpen}
		<div
			class="menu-popover overflow-scroll rounded border border-default"
			use:clickOutside
			on:clickOutside={onClickOutside}
			style="width: {width}; max-height: {maxHeight};"
			on:click={() => {
				isOpen = false;
			}}
			aria-hidden="true"
		>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="less">
	.relative {
		position: relative;
	}

	.menu-popover {
		position: absolute;
		z-index: 1000;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
