<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import { EInputSizeVariant, type IInputProps, EInputColorVariant } from '$lib/types';

	export let label: IInputProps['label'] = '';
	export let labelGap: IInputProps['labelGap'] = false;
	export let error: IInputProps['error'] = '';
	export let sizeVariant: IInputProps['sizeVariant'] = EInputSizeVariant.FULL_WIDTH;
	export let colorVariant: IInputProps['colorVariant'] = EInputColorVariant.DARK;
	export let value: IInputProps['value'] = '';
	export let disabled: IInputProps['disabled'] = false;
	export let readonly: IInputProps['readonly'] = false;
	export let RightIcon: IInputProps['RightIcon'] = null;
	export let RightIconProps: IInputProps['RightIconProps'] = {};
	export let LeftContent: IInputProps['LeftContent'] = null;
	export let max: IInputProps['max'] = '';
	export let min: IInputProps['min'] = '';
	export let onInput: IInputProps['onInput'] = () => {};
	export let hideLeftBorder: IInputProps['hideLeftBorder'] = false;
	export let classNames: IInputProps['classNames'] = '';
	export let textColor: IInputProps['textColor'] = '';
	export let tooltipContent: IInputProps['tooltipContent'] = '';

	const handleInput: IInputProps['onInput'] = (event) => {
		const inputValue = (event.target as HTMLInputElement).value;
		if (!onInput) {
			return;
		}

		if ($$props.type === 'bigint') {
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

<div class={`${$$props.class} rounded-none size-variant-${sizeVariant}`}>
	<div class={` color-variant-${colorVariant} relative`} class:disabled>
		{#if label && !labelGap}
			<Label value={label} {tooltipContent} />
		{/if}
		{#if !label && labelGap}
			<div style="height: 30px" />
		{/if}
		<div
			class={`input-container flex flex-row justify-between`}
			class:readonly
			on:click
			aria-hidden="true"
			style={`${
				hideLeftBorder
					? 'border-left: none; border-bottom-left-radius: 0; border-top-left-radius: 0;'
					: ''
			} ${$$props.style}`}
		>
			{#if LeftContent}
				<div class="box mr-2">
					{#if typeof LeftContent === 'string'}
						<Typography variant="labelSmall" class="mr-2" style="font-size:12px"
							>{LeftContent}</Typography
						>
					{:else}
						<svelte:component this={LeftContent} stroke="white" width="12px" height="12px" />
					{/if}
				</div>
			{/if}
			<input
				{...$$restProps}
				bind:value
				{disabled}
				{readonly}
				on:input={handleInput}
				{min}
				{max}
				class={classNames}
				style="color: {textColor}"
			/>
			{#if RightIcon}
				<div class="box ml-2">
					{#if typeof RightIcon === 'string'}
						<Typography variant="labelSmall" style="font-size:12px">{RightIcon}</Typography>
					{:else}
						<svelte:component this={RightIcon} {...RightIconProps} />
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
		margin-right: 8px;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		opacity: 0.7;
		height: 18px;
		min-height: 18px;
		width: 18px;
		min-width: 18px;
	}

	.disabled {
		.input-container {
			background: var(--darkNet);
		}

		input {
			opacity: 0.6;
			cursor: not-allowed;
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
		border: 0.4px solid var(--default);
		color: #fff;
		font-family: var(--secondary-font);
		font-style: normal;
		font-weight: 400;

		padding: 4px 14px;
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		& input {
			width: 100%;
			background-color: transparent;

			&::placeholder:not(:disabled) {
				opacity: 0.4;
			}

			&:focus-visible {
				outline: none;
			}
		}
	}
</style>
