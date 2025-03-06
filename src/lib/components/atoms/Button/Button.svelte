<script lang="ts">
	import { type IButtonProps, EButtonSizeVariant, EButtonStyleVariant } from '$lib/types';

	let {
		sizeVariant = EButtonSizeVariant.PRIMARY,
		styleVariant = EButtonStyleVariant.PRIMARY,
		LeftContent = null,
		disabled = false,
		classNames = '',
		onclick,
		children,
		...rest
	}: IButtonProps = $props();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let isOnHover = $state(false);
</script>

<button
	{...rest}
	onmouseenter={() => {
		isOnHover = true;
	}}
	onmouseleave={() => {
		isOnHover = false;
	}}
	class={`w-${sizeVariant} style-${disabled ? 'disabled' : styleVariant} ${classNames}`}
	{onclick}
>
	{#if LeftContent}
		{#if typeof LeftContent === 'string'}
			{LeftContent}
		{:else}
			<LeftContent width="12px" height="12px" />
		{/if}
	{/if}
	<span class="typography_button">{@render children?.()}</span>
</button>

<style lang="less">
	button {
		padding: 6px 10px;
		text-align: center;
		height: fit-content;
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
			letter-spacing: 0.04rem;
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
