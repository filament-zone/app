<script lang="ts">
	import { type ITableValidatorComponentProps } from '$lib/types';
	import { Typography } from '$lib/components';

	export let Icon: ITableValidatorComponentProps['Icon'];
	export let label: ITableValidatorComponentProps['label'];
</script>

<div class="flex flex-row items-center">
	{#if Icon}
		<div class="mr-2">
			<svelte:component this={Icon} style="width: 24px; height: 24px" />
		</div>
	{/if}
	<div>
		<Typography variant="caption">{label}</Typography>
	</div>
</div>
