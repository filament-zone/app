<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import type { IToggleOption, IToggleProps } from '$lib/components/molecules/Toggle/Toggle.svelte';

	export let options: IToggleProps['options'] = null;
	export let value: IToggleProps['value'] = null;
	export let label: IToggleProps['label'] = '';
	export let isMulti: IToggleProps['isMulti'] = false;

	$: updateValue = (selectedValues: string[]) => {
		if (isMulti) {
			if (Array.isArray(options) && selectedValues.length === options.length - 1) {
				value = [];
			} else {
				value = [...selectedValues];
			}
		} else {
			value = selectedValues;
		}
	};

	$: selectOption = (option: IToggleOption<string>) => {
		if (isMulti) {
			if (option.value === 'all') {
				value = [];
			} else {
				if (!Array.isArray(value)) {
					value = [];
				}
				const selectedValues = value.includes(option.value)
					? [...value.filter((v: string) => v !== option.value)]
					: [...value, option.value];
				updateValue(selectedValues);
			}
		} else {
			value = option.value;
		}
	};

	$: if (isMulti && options) {
		const allOption: IToggleOption<string> = { value: 'all', label: 'All' };
		if (!options.some((opt: IToggleOption<string>) => opt.value === 'all')) {
			options = [allOption, ...options];
		} else {
			value = [];
		}
	}

	$: isOptionSelected = (option: IToggleOption<string>) => {
		if (isMulti && Array.isArray(value)) {
			if (value.length === 0 && option.value === 'all') {
				return true;
			}
			return value.includes(option.value);
		} else {
			return value === option.value;
		}
	};
</script>

<div>
	{#if label}
		<Label {label} />
	{/if}
	{#if options && options.length > 0}
		<div class="toggle-container">
			{#each options as option}
				<div
					class="toggle"
					class:selected={isOptionSelected(option)}
					class:disabled={option.disabled}
					on:click={() => {
						if (!option.disabled) {
							selectOption(option);
						}
					}}
					aria-hidden="true"
				>
					<Typography
						variant="caption"
						color={isOptionSelected(option) ? 'var(--darkNet)' : 'var(--primary-white)'}
						>{option.label}</Typography
					>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	.disabled {
		opacity: 0.3;
		cursor: not-allowed !important;
	}
	.toggle-container {
		display: flex;
		padding: 3px;
		align-items: flex-start;
		gap: 0.625rem;
		border-radius: 2px;
		background: var(--content1);
		width: fit-content;
	}
	.toggle {
		display: flex;
		padding: 8px;
		justify-content: center;
		align-items: center;
		gap: 0.625rem;
		border-radius: 4px;
		transition: background-color 0.3s;
		cursor: pointer;
	}
	.selected {
		background-color: var(--foreground);
	}
</style>
