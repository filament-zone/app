<!-- @migration-task Error while migrating Svelte code: Can't migrate code with beforeUpdate. Please migrate by hand. -->
<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { ListItem, Input, SelectedItemMulti } from '$lib/components';
	import { EDropdownSizeVariant, type IDropdownOption, type IDropdownProps } from '$lib/types';
	import ChevronUpIcon from '$lib/assets/icons/chevron-up.svg?component';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';

	let {
		label = '',
		sizeVariant = EDropdownSizeVariant.FULL_WIDTH,
		value = null,
		options = [],
		placeholder = 'Select',
		onChange = () => {},
		isSearchable = false,
		isCreatable = false,
		isMulti = false,
		displaySelectedValues = true,
		disabled = false,
		leftLabel = '',
		valueColor = '',
		classNames = '',
		styles = ''
	}: IDropdownProps = $props();

	let isOpen = $state(false);

	const toggleDropdown = () => {
		if (!disabled) {
			isOpen = !isOpen;
		}
	};

	let inputValue = $state(null as string | null);
	let searchValue = $state(null as string | null);
	let localValue = $state(null as string | null);

	let createOption = $derived.by(() => ({
		label: `Create "${searchValue ?? inputValue}"`,
		value: searchValue ?? inputValue
	}));

	const selectOption = (option: IDropdownOption) => {
		let resValue;

		if (isCreatable && option === createOption && options) {
			const newOption = {
				label: searchValue ?? inputValue ?? '',
				value: searchValue ?? inputValue ?? ''
			};
			options = [...options, newOption];
			if (isMulti) {
				if (value) {
					resValue = [...value, newOption.value];
				} else {
					resValue = [newOption.value];
				}
			} else {
				resValue = newOption.value;
			}
		} else if (value && isMulti) {
			if (value.includes(option.value)) {
				resValue = isMulti ? (value as string[]).filter((val) => val !== option.value) : value;
			} else {
				resValue = [...value, option.value];
			}
		} else {
			if (isMulti) {
				resValue = [option.value];
			} else {
				resValue = option.value;
			}
		}

		if (onChange) {
			onChange(resValue);
		}
		value = resValue;
		searchValue = null;
		localValue = null;
		inputValue = null;
		isOpen = false;
	};

	const filteredOptions = $derived.by(() => {
		if (!options?.length) {
			return [];
		}

		let localOptions = [...options];

		localOptions = localOptions.filter((option) => {
			if (isSearchable && searchValue) {
				return option.label.toLowerCase().includes(searchValue.toLowerCase());
			}
			return true;
		});

		localOptions = localOptions.filter((option) => {
			if (!isMulti) {
				return value !== option.value;
			}
			if (Array.isArray(value)) {
				return !value?.filter((val) => val === option.value).length;
			}
			return true;
		});

		return localOptions;
	});

	const showCreateOption = $derived(
		(searchValue || inputValue) &&
			isCreatable &&
			!options?.some(
				(option) => option.label.toLowerCase() === (searchValue ?? inputValue)?.toLowerCase()
			)
	);

	const isReadonly = () => {
		if (isSearchable || isCreatable) {
			return false;
		} else {
			return true;
		}
	};

	const handleInputChange = (e: Event) => {
		isOpen = true;
		if (isSearchable) {
			searchValue = (e.target as HTMLInputElement).value;
		} else {
			inputValue = (e.target as HTMLInputElement).value;
		}
	};

	$effect.pre(() => {
		if (!isMulti) {
			if (isSearchable) {
				localValue =
					options?.find(
						(option) => option.value?.toLowerCase() === (value as string)?.toLowerCase()
					)?.label ?? '';
			} else {
				if (value) {
					localValue =
						options?.find(
							(option) => option.value?.toLowerCase() === (value as string)?.toLowerCase()
						)?.label ?? '';
				} else {
					localValue = '';
				}
			}
		} else {
			if (isSearchable) {
				localValue = searchValue ?? '';
			} else {
				if (inputValue) {
					localValue = inputValue;
				}
			}
		}
	});

	const hideLeftBorder = () => {
		if (isMulti) {
			if (value?.length) {
				if (displaySelectedValues) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		return false;
	};

	const getLeftIcon = $state(() => {
		if (Array.isArray(value)) {
			return options?.find((option) => option.value === value?.[0])?.icon;
		} else if (value) {
			return options?.find((option) => option.value === value)?.icon;
		}
	});
</script>

<div
	class={`${classNames} ${sizeVariant === EDropdownSizeVariant.FULL_WIDTH ? 'w-full' : ''}`}
	use:clickOutside={[]}
	onclickOutside={() => (isOpen = false)}
>
	<div class="dropdown-container">
		{#if isMulti && value?.length && displaySelectedValues}
			<div
				class="multi-selected-items-container flex flex-row gap-4"
				style={value?.length ? 'padding: 4px 16px' : ''}
			>
				{#each value as valueItem}
					<SelectedItemMulti
						option={{
							value: valueItem,
							label: options?.find((option) => option.value === valueItem)?.label ?? ''
						}}
						onCloseIconClick={() => {
							if (disabled) {
								return;
							}
							selectOption({
								value: valueItem,
								label: options?.find((option) => option.value === valueItem)?.label ?? ''
							});
						}}
					/>{/each}
			</div>
		{/if}

		<Input
			{disabled}
			{label}
			value={localValue}
			onInput={handleInputChange}
			on:click={toggleDropdown}
			class="w-full"
			readonly={isReadonly()}
			{leftLabel}
			RightIcon={isOpen ? ChevronUpIcon : ChevronDownIcon}
			LeftIcon={getLeftIcon()}
			{sizeVariant}
			placeholder={displaySelectedValues && isMulti && value?.length ? '' : placeholder}
			hideLeftBorder={hideLeftBorder()}
			style={`${valueColor ? `color: ${valueColor}` : ''} ${styles}`}
		/>
		{#if isOpen}
			<div class="list-container" style={`top: ${label ? '68px' : '34px'}`}>
				{#if filteredOptions.length}
					{#each filteredOptions as option}
						<ListItem
							{option}
							selected={value?.includes(option.value)}
							on:click={() => {
								if (!option.disabled) {
									return selectOption(option);
								}
							}}
						/>
					{/each}
				{:else}
					<ListItem option={{ label: 'No results', value: '' }} isPlaceholder />
				{/if}
				{#if showCreateOption}
					<ListItem option={createOption} on:click={() => selectOption(createOption)} />
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown-container {
		display: flex;
		flex-direction: row;
		border-radius: 4px;
		position: relative;
	}
	.multi-selected-items-container {
		border: 0.5px solid var(--default-border);
		border-right: none;
		border-bottom-left-radius: 4px;
		border-top-left-radius: 4px;
		background: #141414;
		justify-content: center;
		align-items: center;
	}
	.list-container {
		width: 100%;
		background-color: black;
		border: 0.5px solid var(--default-border);
		position: absolute;
		left: 0;
		z-index: 1000;
	}
</style>
