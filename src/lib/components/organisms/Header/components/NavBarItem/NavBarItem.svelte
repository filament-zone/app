<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/actions';
	import { List, Typography } from '$lib/components';
	import type { IListItemOption, INavBarItemOption } from '$lib/types';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';

	export let option: INavBarItemOption;

	const isOpen = writable<boolean>(false);

	const handleClickOutside = () => {
		isOpen.set(false);
	};

	const data = derived(page, () => $page.data);

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

	type RouteConfig = {
		condition: () => boolean | undefined;
		getLabel: () => string;
	};

	const routeLabelMap: Record<string, RouteConfig> = {
		campaignDetails: {
			condition: () => $page.route.id?.includes('campaignId'),
			getLabel: () => $data?.campaign?.title || ''
		},
		create: {
			condition: () => $page.route.id?.includes('create'),
			getLabel: () => 'Create'
		}
	};

	const getCustomLabel = () => {
		for (const key in routeLabelMap) {
			const { condition, getLabel } = routeLabelMap[key];
			if (condition()) {
				return getLabel();
			}
		}
		return '';
	};

	$: generateLabel = () => {
		if (option.subItems?.length && currentPath.split('/')[1] === option.path?.split('/')[1]) {
			const customLabel = getCustomLabel();
			const defaultLabel = currentPath.split('/')[2];
			return `${option.label} / ${customLabel || defaultLabel}`;
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
		>
		{#if option.subItems}
			<ChevronDownIcon
				style="transform: scale(0.7);"
				stroke={mainRouteSelected ? 'var(--filaMint)' : 'var(--primary-white)'}
			/>
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
			padding: 0 12px 10px 12px;
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
	}
</style>
