<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { writable } from 'svelte/store';
	import { clickOutside } from '$lib/actions';
	import { ListItem, Input, SelectedItemMulti } from '$lib/components';
	import ChevronRight from '$lib/assets/icons/chevron-right.svg?component';
	import { EDropdownSizeVariant, type IDropdownOption, type IDropdownProps } from '$lib/types';

	export let label: IDropdownProps['label'] = '';
	export let sizeVariant: IDropdownProps['sizeVariant'] = EDropdownSizeVariant.FULL_WIDTH;
	export let value: IDropdownProps['value'] = null;
	export let options: IDropdownProps['options'] = [];
	export let placeholder: IDropdownProps['placeholder'] = 'Select';
	export let onChange: IDropdownProps['onChange'] = () => {};
	export let isSearchable: IDropdownProps['isSearchable'] = false;
	export let isCreatable: IDropdownProps['isCreatable'] = false;
	export let isMulti: IDropdownProps['isMulti'] = false;
	export let displaySelectedValues: IDropdownProps['displaySelectedValues'] = true;
	export let disabled: IDropdownProps['disabled'] = false;
	export let leftLabel: IDropdownProps['leftLabel'] = '';
	export let valueColor: IDropdownProps['valueColor'] = '';

	let isOpen = writable(false);

	const toggleDropdown = () => {
		if (!disabled) {
			isOpen.update((n) => !n);
		}
	};

	let inputValue = null as string | null;
	$: searchValue = null as string | null;
	$: localValue = null as string | null;

	$: createOption = {
		label: `Create "${searchValue ?? inputValue}"`,
		value: searchValue ?? inputValue
	} as IDropdownOption;

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
		isOpen.set(false);
	};

	$: filterOptions = () => {
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
	};

	$: filteredOptions = filterOptions();

	$: showCreateOption =
		(searchValue || inputValue) &&
		isCreatable &&
		!options?.some(
			(option) => option.label.toLowerCase() === (searchValue ?? inputValue)?.toLowerCase()
		);

	const isReadonly = () => {
		if (isSearchable || isCreatable) {
			return false;
		} else {
			return true;
		}
	};

	const handleInputChange = (e: Event) => {
		isOpen.set(true);
		if (isSearchable) {
			searchValue = (e.target as HTMLInputElement).value;
		} else {
			inputValue = (e.target as HTMLInputElement).value;
		}
	};

	beforeUpdate(() => {
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

	$: hideLeftBorder = () => {
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

	$: getLeftIcon = () => {
		if (Array.isArray(value)) {
			return options?.find((option) => option.value === value?.[0])?.icon;
		} else if (value) {
			return options?.find((option) => option.value === value)?.icon;
		}
	};
</script>

<div
	class={`${$$props.class} ${sizeVariant === EDropdownSizeVariant.FULL_WIDTH ? 'w-full' : ''}`}
	use:clickOutside
	on:clickOutside={() => isOpen.set(false)}
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
			RightIcon={!disabled ? ChevronRight : null}
			LeftIcon={getLeftIcon()}
			{sizeVariant}
			placeholder={displaySelectedValues && isMulti && value?.length ? '' : placeholder}
			hideLeftBorder={hideLeftBorder()}
			style={`${valueColor ? `color: ${valueColor}` : ''} ${$$props.style}`}
		/>
		{#if $isOpen}
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
		border: 0.4px solid var(--default);
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
		border: 0.4px solid var(--default);
		position: absolute;
		left: 0;
		z-index: 1000;
	}
</style>
