<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import { EInputSizeVariant, type IInputProps, EInputColorVariant } from '$lib/types';

	let {
		label = '',
		labelGap = false,
		error = '',
		sizeVariant = EInputSizeVariant.FULL_WIDTH,
		colorVariant = EInputColorVariant.DARK,
		value = $bindable(''),
		disabled = false,
		readonly = false,
		RightIcon = null,
		RightIconProps = {},
		LeftContent = null,
		max = '',
		min = '',
		onInput = () => {},
		hideLeftBorder = false,
		classNames = '',
		textColor = '',
		tooltipContent = '',
		type,
		styles = '',
		placeholder,
		onclick
	}: IInputProps = $props();

	const handleInput: IInputProps['onInput'] = (event) => {
		const inputValue = (event.target as HTMLInputElement).value;
		if (!onInput) {
			return;
		}

		if (type === 'bigint') {
			try {
				const bigintValue = BigInt(inputValue);
				onInput(bigintValue);
			} catch {
				onInput(null);
			}
		} else {
			onInput(inputValue);
		}
	};
</script>

<div class={`${classNames} rounded-none size-variant-${sizeVariant}`}>
	<div class={` color-variant-${colorVariant} relative`} class:disabled>
		{#if label && !labelGap}
			<Label value={label} {tooltipContent} />
		{/if}
		{#if !label && labelGap}
			<div style="height: 30px"></div>
		{/if}
		<div
			class={`input-container flex flex-row justify-between`}
			class:readonly
			aria-hidden="true"
			style={`${
				hideLeftBorder
					? 'border-left: none; border-bottom-left-radius: 0; border-top-left-radius: 0;'
					: ''
			} ${styles}`}
		>
			{#if LeftContent}
				<div class="box mr-2">
					{#if typeof LeftContent === 'string'}
						<Typography variant="labelSmall" classNames="mr-2" styles="font-size:12px"
							>{LeftContent}</Typography
						>
					{:else}
						<LeftContent stroke="white" width="12px" height="12px" />
					{/if}
				</div>
			{/if}
			<input
				bind:value
				{disabled}
				{readonly}
				oninput={handleInput}
				{placeholder}
				{min}
				{max}
				class={classNames}
				style="color: {textColor}"
				{onclick}
			/>
			{#if RightIcon}
				<div class="box ml-2">
					{#if typeof RightIcon === 'string'}
						<Typography variant="labelSmall" styles="font-size:12px">{RightIcon}</Typography>
					{:else}
						<RightIcon {...RightIconProps} />
					{/if}
				</div>
			{/if}
		</div>
		{#if error}
			<Typography variant="labelSmall" color="red">{error}</Typography>
		{/if}
	</div>
</div>

<style lang="less">
	.left-label {
		text-wrap: nowrap;
		font-size: 10px;
		padding: 20px;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		opacity: 0.8;
		min-height: 18px;
		min-width: 18px;
		width: fit-content;
	}

	.disabled {
		.input-container {
			background: unset;
		}

		input {
			opacity: 1;
			cursor: not-allowed !important;
		}
	}

	.readonly {
		cursor: pointer;

		input {
			cursor: pointer;
		}
	}

	.size-variant-full-width {
		width: 100%;
	}

	.size-variant-medium {
		width: 282px;
	}

	.size-variant-small {
		width: 138px;
	}

	.input-container {
		border-radius: 4px;
		background: var(--highlight-bg);
		border: 0.5px solid var(--default-border);
		color: #fff;
		font-family: var(--secondary-font);
		font-style: normal;
		font-weight: 400;
		gap: 14px;
		padding: 8px 14px;
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		&:focus-within {
			border-color: gray;
		}

		& input {
			width: 100%;
			background-color: transparent;

			&::placeholder:not(:disabled) {
				opacity: 0.9;
			}

			&:focus-visible {
				outline: none;
			}
		}
	}
</style>
