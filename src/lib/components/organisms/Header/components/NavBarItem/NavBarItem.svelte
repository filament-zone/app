<script lang="ts">
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/actions';
	import { List, Typography } from '$lib/components';
	import type { IListItemOption, INavBarItemOption } from '$lib/types';
	import { ChevronDownIcon } from 'svelte-feather-icons';

	export let option: INavBarItemOption;

	const isOpen = writable<boolean>(false);

	const handleClickOutside = () => {
		isOpen.set(false);
	};

	$: currentPath = $page?.url?.pathname ?? '';
	$: mainRouteSelected = currentPath.split('/')[1] === option.path?.split('/')[1];

	$: {
		if (option.subItems && option.subItems.length) {
			option.subItems = option.subItems.map((subItem) => {
				const listSubItem: IListItemOption<string> = {
					label: subItem.label,
					value: subItem.value,
					onClick: () => {
						if (subItem.path) {
							goto(subItem.path);
						}
						isOpen.set(false);
					}
				};
				return listSubItem;
			});
		}
	}

	$: generateLabel = () => {
		if (option.subItems?.length && currentPath.split('/')[1] === option.path?.split('/')[1]) {
			return `${option.label} / ${currentPath.split('/')[2]}`;
		}
		return option.label;
	};
</script>

<div class="nav-item-container">
	<div
		class="nav-item"
		data-testId={`nav-item-${option.value}`}
		class:selected={mainRouteSelected}
		on:click={() => {
			if (!option.subItems && option.path) {
				goto(option.path);
			}
			isOpen.update((n) => !n);
		}}
		aria-hidden="true"
	>
		<Typography
			variant="h6"
			color={mainRouteSelected ? 'var(--filaMint)' : 'var(--primary-white)'}
			styles={`white-space: nowrap; ${mainRouteSelected && 'font-weight: 600'}`}
			>{generateLabel()}</Typography
		>{#if option.subItems}
			<span class={mainRouteSelected ? 'filament-icon' : 'white-icon'}>
				<ChevronDownIcon class="w-4 h-4" />
			</span>
		{/if}
	</div>
	{#if option.subItems && $isOpen}
		<div class="sub-items-container" use:clickOutside on:clickOutside={handleClickOutside}>
			<List options={option.subItems} on:click={option.onClick} />
		</div>
	{/if}
</div>

<style lang="less">
	.nav-item-container {
		cursor: pointer;
		text-transform: capitalize;
		position: relative;
		height: 100%;

		.nav-item {
			display: flex;
			padding: 0 12px;
			height: 100%;
			align-items: center;
			font-weight: inherit;
			gap: 0.5rem;

			&.selected {
				font-weight: 800;
			}
		}

		.sub-items-container {
			position: absolute;
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.selected {
			border-bottom: 1.5px solid var(--filaMint);
			font-weight: 700;
		}

		.white-icon {
			color: white;
		}

		.filament-icon {
			color: var(--filaMint);
		}
	}
</style>
