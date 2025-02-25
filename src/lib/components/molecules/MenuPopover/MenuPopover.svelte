<!-- @migration-task Error while migrating Svelte code: Can't migrate code with afterUpdate. Please migrate by hand. -->
<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { portal } from 'svelte-portal';
	import { v4 as uuidV4 } from 'uuid';
	import { clickOutside } from '$lib/actions';
	import type { IMenuPopoverProps } from '$lib/types';

	export let width: IMenuPopoverProps['width'];
	export let maxHeight: IMenuPopoverProps['maxHeight'] = '';

	let isOpen = false;

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
	<div on:click={openPopover} aria-hidden="true" id={`popover-parent-${popoverId}`}>
		<slot name="trigger" />
	</div>
	{#if isOpen}
		<div
			use:portal={'body'}
			class="menu-popover overflow-scroll rounded-sm border border-default"
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
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
