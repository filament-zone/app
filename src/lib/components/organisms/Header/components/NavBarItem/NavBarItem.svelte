<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/actions';
	import { List, Typography } from '$lib/components';
	import type { IListItemOption, INavBarItemProps } from '$lib/types';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';

	let { option }: INavBarItemProps = $props();

	let isOpen = $state(false);

	const handleClickOutside = () => {
		isOpen = false;
	};

	let currentPath = $derived(page.url?.pathname ?? '');
	let mainRouteSelected = $derived(currentPath.split('/')[1] === option.path?.split('/')[1]);

	$effect(() => {
		if (option.subItems && option.subItems.length) {
			option.subItems = option.subItems.map((subItem) => {
				const listSubItem: IListItemOption<string> = {
					label: subItem.label,
					value: subItem.value,
					onclick: () => {
						if (subItem.path) {
							goto(subItem.path);
						}
						isOpen = false;
					}
				};
				return listSubItem;
			});
		}
	});

	type RouteConfig = {
		condition: () => boolean | undefined;
		getLabel: () => string;
	};

	const routeLabelMap: Record<string, RouteConfig> = $derived({
		campaignDetails: {
			condition: () => page.route.id?.includes('campaignId'),
			getLabel: () => page.data.campaign?.title || ''
		},
		create: {
			condition: () => page.route.id?.includes('create'),
			getLabel: () => 'Create'
		}
	});

	const getCustomLabel = () => {
		for (const key in routeLabelMap) {
			const { condition, getLabel } = routeLabelMap[key];
			if (condition()) {
				return getLabel();
			}
		}
		return '';
	};

	const generateLabel = () => {
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
		onclick={() => {
			if (!option.subItems && option.path) {
				goto(option.path);
			}
			isOpen = !isOpen;
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
	{#if option.subItems && isOpen}
		<div class="sub-items-container" use:clickOutside={[]} onclickOutside={handleClickOutside}>
			<List options={option.subItems} onclick={option.onClick} />
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
