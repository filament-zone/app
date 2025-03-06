<script lang="ts">
	import { eventListener } from '$lib/helpers';

	import SettingsCircleIcon from '$lib/assets/icons/settings-circle.svg?component';
	import SettingsCircleGreenIcon from '$lib/assets/icons/settings-circle-green.svg?component';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	let { id, isCompleted, isSettingsCircleGreen } = $props();

	let isHovered = $state(false);

	const handleHover = (customEvent: Event) => {
		const rowId = (customEvent as CustomEvent<{ rowId: string | null }>).detail;

		if (rowId === id) {
			isHovered = true;
		} else {
			isHovered = false;
		}
	};

	eventListener('custom-table-hover-rowId', handleHover);
</script>

{#if isHovered}
	<SettingsCircleIcon />
{:else if isCompleted}
	<CheckmarkCircleIcon fill="var(--upOnly)" />
{:else if isSettingsCircleGreen}
	<SettingsCircleGreenIcon />
{:else}
	<SettingsCircleIcon />
{/if}
