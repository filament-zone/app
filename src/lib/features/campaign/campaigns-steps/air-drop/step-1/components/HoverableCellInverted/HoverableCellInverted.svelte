<script lang="ts">
	import { eventListener } from '$lib/helpers';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import MinusCircleIcon from '$lib/assets/icons/minus-circle.svg?component';
	import { type IHoverableCellInvertedProps } from '$lib/types';

	interface Props {
		id: any;
		isSelected: IHoverableCellInvertedProps['isSelected'];
	}

	let { id, isSelected }: Props = $props();

	let localIsSelected = $state(isSelected);

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
	<CheckmarkCircleIcon fill="var(--upOnly)" />
{:else}
	<MinusCircleIcon />
{/if}
