<script lang="ts">
	import { writable } from 'svelte/store';
	import Arrow1Icon from '$lib/assets/icons/arrow-right.svg?component';
	import type { ISideBarAccordionProps } from '$lib/types';

	interface Props {
		label: ISideBarAccordionProps['label'];
		children?: import('svelte').Snippet;
	}

	let { label, children }: Props = $props();

	let isOpen = writable(false);

	const toggleAccordion = () => {
		isOpen.update((value) => !value);
	};
</script>

<div class="container">
	<div class="header">
		<div class="label">
			<div class="dot"></div>
			<span>{label}</span>
		</div>
		<div class="icon" onclick={toggleAccordion} aria-hidden="true">
			<Arrow1Icon
				style={`transform: ${$isOpen ? 'rotate(90deg)' : 'rotate(-90deg)'}; stroke: ${$isOpen ? '#fff' : '#8E8E8E'};`}
			/>
		</div>
	</div>
	{#if $isOpen}
		{@render children?.()}
	{/if}
</div>

<style lang="less">
	.container {
		padding: 10px;
		background: #1d1d1d;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 16px;

		.header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.label {
				background: #101113;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: fit-content;
				padding: 4px 10px;
				height: 24px;
				border-radius: 4px;

				color: #fff;

				font-family: 'ff-meta-serif-web-pro', serif;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: 0.875rem;

				.dot {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background: #00ffff;
					margin-right: 10px;
				}
			}

			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				padding: 6px;
				background: #191919;
				width: 20px;
				height: 20px;
				border-radius: 4px;
			}
		}
	}
</style>
