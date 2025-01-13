<script lang="ts">
	import { eventListener } from '$lib/helpers';

	import SettingsCircleIcon from '$lib/assets/icons/settings-circle.svg?component';
	import SettingsCircleGreenIcon from '$lib/assets/icons/settings-circle-green.svg?component';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	export let id;
	export let isCompleted;
	export let isSettingsCircleGreen;

	let isHovered = false;

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
	<svelte:component this={SettingsCircleIcon} />
{:else if isCompleted}
	<svelte:component this={CheckmarkCircleIcon} fill="var(--upOnly-400)" />
{:else if isSettingsCircleGreen}
	<svelte:component this={SettingsCircleGreenIcon} />
{:else}
	<svelte:component this={SettingsCircleIcon} />
{/if}
