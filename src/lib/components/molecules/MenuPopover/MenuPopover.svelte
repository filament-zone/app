<script lang="ts">
	import { portal } from 'svelte-portal';
	import { v4 as uuidV4 } from 'uuid';
	import { clickOutside } from '$lib/actions';
	import type { IMenuPopoverProps } from '$lib/types';

	let { width, maxHeight, trigger, content }: IMenuPopoverProps = $props();
	let isOpen = $state(false);

	const onClickOutside = () => {
		isOpen = false;
	};

	const popoverId = uuidV4();

	const adjustPopoverPosition = (popover: HTMLElement) => {
		const parentRect = document
			?.getElementById(`popover-parent-${popoverId}`)
			?.getBoundingClientRect();

		if (!parentRect) {
			return;
		}

		let left = parentRect.left;
		let top = parentRect.bottom;

		popover.style.left = `${left}px`;
		popover.style.top = `${top}px`;

		const adjustedRect = popover.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		if (adjustedRect.right > viewportWidth) {
			left = viewportWidth - adjustedRect.width - 10;
		} else if (adjustedRect.left < 0) {
			left = 10;
		}

		if (adjustedRect.bottom > viewportHeight) {
			top = parentRect.top - adjustedRect.height;
		} else if (adjustedRect.top < 0) {
			top = parentRect.bottom;
		}

		popover.style.left = `${left}px`;
		popover.style.top = `${top}px`;
	};

	$effect(() => {
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
	<div onclick={openPopover} aria-hidden="true" id={`popover-parent-${popoverId}`}>
		{@render trigger?.()}
	</div>
	{#if isOpen}
		<div
			use:portal={'body'}
			class="menu-popover overflow-scroll rounded-sm border border-default"
			use:clickOutside={[]}
			onclickOutside={onClickOutside}
			style="width: {width}; max-height: {maxHeight};"
			onclick={() => {
				isOpen = false;
			}}
			aria-hidden="true"
		>
			{@render content?.()}
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
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
