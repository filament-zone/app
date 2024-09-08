<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import { EToggleVariant, type IToggleOption, type IToggleProps } from '$lib/types';

	export let options: IToggleProps['options'] = null;
	export let value: IToggleProps['value'] = null;
	export let label: IToggleProps['label'] = '';
	export let isMulti: IToggleProps['isMulti'] = false;
	export let variant: IToggleProps['variant'] = EToggleVariant.PRIMARY;

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

	const getTypographyColor = (isSelected: boolean, variant: EToggleVariant) => {
		switch (variant) {
			case EToggleVariant.PRIMARY:
				if (!isSelected) {
					return 'var(--primary-white)';
				} else {
					return 'var(--darkNet)';
				}
			case EToggleVariant.SECONDARY:
				if (!isSelected) {
					return 'var(--primary-white)';
				} else {
					return 'var(--filaMint-500)';
				}
		}
	};
</script>

<div>
	{#if label}
		<Label value={label} />
	{/if}
	{#if options && options.length > 0}
		<div class="toggle-container toggle-container-{variant}">
			{#each options as option}
				<div
					class="toggle-{variant}"
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
						color={getTypographyColor(isOptionSelected(option), variant)}>{option.label}</Typography
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
		cursor: pointer;
	}

	.toggle-container-primary {
		display: flex;
		align-items: flex-start;
		gap: 0.625rem;
		height: 30px;
		border-radius: 2px;
		background: var(--content1);
		width: fit-content;
	}

	.toggle-container-secondary {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		border-bottom: 1px solid var(--gray-200);
	}

	.toggle-primary {
		display: flex;
		padding: 8px;
		justify-content: center;
		align-items: center;
		gap: 0.625rem;
		border-radius: 4px;
		transition: background-color 0.3s;
		cursor: pointer;

		&.selected {
			background-color: var(--foreground);
		}
	}

	.toggle-secondary {
		padding: 0 1rem;
		&.selected {
			color: red;
			margin-bottom: -1px;
			border-bottom: 1px solid var(--filaMint-500);
		}
	}
</style>
