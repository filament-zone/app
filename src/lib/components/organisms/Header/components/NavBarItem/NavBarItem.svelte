<!-- @migration-task Error while migrating Svelte code: can't migrate `$: currentPath = $page?.url?.pathname ?? '';` to `$derived` because there's a variable named derived.
     Rename the variable and try again or migrate by hand. -->
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

<div class="nav-item-container h-fit md:h-full justify-center items-center w-full md:w-fit">
	<div
		class="nav-item h-fit md:h-full items-center justify-center w-fit p-6 md:px-6 md:py-3"
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
		display: flex;

		.nav-item {
			display: flex;
			align-items: center;
			font-weight: inherit;
			gap: 0.5rem;
			position: relative;
			transition: color 0.3s ease;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 0;
				height: 2px;
				background-color: var(--filaMint);
				transition:
					width 0.3s ease,
					left 0.3s ease;
			}

			&.selected::after {
				width: 100%;
				left: 0;
			}

			&.selected {
				font-weight: 800;
				border-bottom: 1.5px solid var(--filaMint);
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
			@media (min-width: 768px) {
				padding-bottom: 14px;
			}
			font-weight: 700;
			transition:
				color 0.3s ease,
				border-bottom 0.3s ease;
		}
	}
</style>
