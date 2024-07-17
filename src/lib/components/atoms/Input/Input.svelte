<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import { EInputSizeVariant, type IInputProps, EInputColorVariant } from '$lib/types';

	export let label: IInputProps['label'] = '';
	export let error: IInputProps['error'] = '';
	export let sizeVariant: IInputProps['sizeVariant'] = EInputSizeVariant.FULL_WIDTH;
	export let colorVariant: IInputProps['colorVariant'] = EInputColorVariant.DARK;
	export let value: IInputProps['value'] = '';
	export let disabled: IInputProps['disabled'] = false;
	export let readonly: IInputProps['readonly'] = false;
	export let leftLabel: IInputProps['leftLabel'] = '';
	export let RightIcon: IInputProps['RightIcon'] = null;
	export let LeftIcon: IInputProps['LeftIcon'] = null;
	export let max: IInputProps['max'] = '';
	export let min: IInputProps['min'] = '';
	export let onInput: IInputProps['onInput'] = () => {};
	export let hideLeftBorder: IInputProps['hideLeftBorder'] = false;
	export let inputClassNames: IInputProps['inputClassNames'] = '';
</script>

<div class={`${$$props.class} size-variant-${sizeVariant}`}>
	<div class={` color-variant-${colorVariant} relative`} class:disabled>
		{#if label}
			<Label value={label} />
		{/if}
		<div
			class={`input-container flex flex-row justify-between`}
			class:readonly
			on:click
			aria-hidden="true"
			style={hideLeftBorder
				? 'border-left: none; border-bottom-left-radius: 0; border-top-left-radius: 0;'
				: ''}
		>
			{#if leftLabel}
				<div class="left-label">{leftLabel}</div>
			{/if}
			{#if LeftIcon}
				{#if typeof LeftIcon === 'string'}
					<img src={LeftIcon} alt="icon" style="height: 12px; width: 12px; margin-right: 4px;" />
				{:else}
					<div class="box mr-4">
						<svelte:component this={LeftIcon} stroke="white" />
					</div>
				{/if}
			{/if}
			<input
				{...$$restProps}
				bind:value
				{disabled}
				{readonly}
				on:input={onInput}
				{min}
				{max}
				class={inputClassNames}
			/>
			{#if RightIcon}
				{#if typeof RightIcon === 'string'}
					<div class="box">{RightIcon}</div>
				{:else}
					<div class="box"><svelte:component this={RightIcon} /></div>
				{/if}
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
		opacity: 0.6;
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
		background: #141414;
		border: 0.4px solid var(--default-border, #303030);
		color: #fff;
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 13px;

		padding: 6px 14px;
		width: 100%;
		height: 30px;

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
