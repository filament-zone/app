<script lang="ts">
	import { eventListener } from '$lib/helpers';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import MinusCircleIcon from '$lib/assets/icons/minus-circle.svg?component';
	import { type IHoverableCellInvertedProps } from '$lib/types';

	export let id;
	export let isSelected: IHoverableCellInvertedProps['isSelected'];

	let localIsSelected = isSelected;

	const handleHover = (customEvent: Event) => {
		const rowId = (customEvent as CustomEvent<{ rowId: string | null }>).detail.rowId;
		const parentElement = customEvent.currentTarget as HTMLElement;

		if (
			parentElement?.contains &&
			parentElement.contains(customEvent.target as Node) &&
			rowId === id
		) {
			localIsSelected = !isSelected;
		} else {
			localIsSelected = isSelected;
		}
	};

	eventListener('custom-table-hover-rowId', handleHover);
</script>

{#if localIsSelected}
	<svelte:component this={CheckmarkCircleIcon} fill="var(--upOnly-400)" />
{:else}
	<svelte:component this={MinusCircleIcon} />
{/if}
