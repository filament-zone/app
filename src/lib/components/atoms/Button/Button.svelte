<script lang="ts">
	import { writable } from 'svelte/store';
	import { EButtonSizeVariant, EButtonVariant } from './Button.enums';
	import type { IButtonProps } from '$lib/types';

	export let sizeVariant: EButtonSizeVariant = EButtonSizeVariant.PRIMARY;
	export let styleVariant: EButtonVariant = EButtonVariant.PRIMARY;
	export let LeftIcon: IButtonProps['LeftIcon'] = null;
	export let disabled: boolean = false;

	const isOnHover = writable<boolean>(false);
</script>

<button
	{...$$props}
	on:mouseenter={() => isOnHover.set(true)}
	on:mouseleave={() => isOnHover.set(false)}
	class={`button w-${sizeVariant} style-${disabled ? 'disabled' : styleVariant} ${$$props.class || ''}`}
	on:click
	{disabled}
>
	{#if LeftIcon}
		<svelte:component this={LeftIcon} width="12px" height="12px" />
	{/if}
	<span class="typography_button"><slot /></span>
</button>

<style lang="less">
	.button {
		padding: 6px 10px;
		text-align: center;
		height: 32px;
		white-space: nowrap;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1px;
		border: 2px solid transparent;
		transition: all 0.3s ease;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}

		&.w-primary {
			width: fit-content;
		}

		&.w-full-width {
			width: 100%;
		}

		.typography_button {
			font-family: var(--primary-font);
			font-size: 15px;
			font-style: normal;
			font-weight: 600;
			line-height: 20px;
			letter-spacing: 0.02rem;
		}

		&.style-secondary {
			--fill-color: var(--darkNet);
			--text-color: #ffffff;
		}

		&.style-disabled {
			--fill-color: #4d4d4d;
			--text-color: #9e9e9e;
		}

		&.style-primary {
			--fill-color: #ffffff;
			--text-color: #000000;
		}

		&.style-positive {
			--fill-color: var(--upOnly);
			--text-color: black;
		}

		&.style-negative {
			--fill-color: var(--rugged);
			--text-color: black;
		}

		&.style-highlight {
			--fill-color: var(--filaMint);
			--text-color: black;
		}

		background-color: var(--fill-color);
		color: var(--text-color);

		&:hover:not(:disabled) {
			background-color: var(--text-color);
			color: var(--fill-color);
			border-color: var(--fill-color);
		}
	}
</style>
