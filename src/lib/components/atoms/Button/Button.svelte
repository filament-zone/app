<script lang="ts">
	import { writable } from 'svelte/store';
	import { EButtonColorVariant, EButtonSizeVariant, type IButtonProps } from '$lib/types';

	export let sizeVariant: IButtonProps['sizeVariant'] = EButtonSizeVariant.PRIMARY;
	export let colorVariant: IButtonProps['colorVariant'] = EButtonColorVariant.PRIMARY;

	export let LeftIcon: IButtonProps['LeftIcon'] = null;
	export let disabled: IButtonProps['disabled'] = false;

	const isOnHover = writable<boolean>(false);
</script>

<button
	{...$$props}
	on:mouseenter={() => {
		isOnHover.set(true);
	}}
	on:mouseleave={() => {
		isOnHover.set(false);
	}}
	class={`w-${sizeVariant} flex justify-center items-center gap-1
		color-variant-${colorVariant} ${$$props.class}`}
	on:click
	{disabled}
>
	{#if LeftIcon}
		<svelte:component this={LeftIcon} width="12px" height="12px" />
	{/if}
	<span class="typography_button"><slot /></span>
</button>

<style lang="less">
	button {
		padding: 6px 10px;
		text-align: center;
		height: 30px;
		border-radius: 2px;
		white-space: nowrap;
		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
		}

		&.w-primary {
			width: fit-content;
		}

		&.w-full-width {
			width: 100%;
		}

		.typography_button {
			font-family: 'fira-sans', sans-serif;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0.05rem;
		}
	}

	.color-variant-primary {
		background-color: var(--filaMint);

		.typography_button {
			color: var(--darkNet);
		}

		&:hover:not(:disabled) {
			background-color: var(--filaMint-100);
			color: var(--darkNet);
		}

		&:disabled {
			background-color: var(--filaMint-700);
			color: var(--filaMint-300);
		}
	}

	.color-variant-secondary {
		background-color: var(--foreground);
		.typography_button {
			color: var(--darkNet);
		}

		&:hover:not(:disabled) {
			background-color: var(--filaMint-100);

			.typography_button {
				color: var(--darkNet);
			}
		}

		&:disabled {
			background-color: var(--filaMint-700);
			.typography_button {
				color: var(--filaMint-300);
			}
		}
	}

	.color-variant-yellow {
		background-color: var(--yellow-200);
		.typography_button {
			color: var(--yellow);
		}

		&:hover:not(:disabled) {
			background-color: var(--yellow-100);

			.typography_button {
				color: var(--darkNet);
			}
		}

		&:disabled {
			opacity: 0.2;
		}
	}

	.color-variant-black {
		background-color: var(--darkNet-100);
		.typography_button {
			color: var(--gray);
		}

		&:hover:not(:disabled) {
			background-color: var(--gray-100);

			.typography_button {
				color: var(--darkNet);
			}
		}

		&:disabled {
			opacity: 0.2;
		}
	}
</style>
