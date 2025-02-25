<script lang="ts">
	import { Typography } from '$lib/components';
	import { type ITableValidatorComponentProps } from '$lib/types';

	let { Icon, label }: ITableValidatorComponentProps = $props();
</script>

<div class="flex flex-row items-center">
	{#if Icon}
		<div class="mr-2">
			<Icon style="width: 24px; height: 24px" />
		</div>
	{/if}
	<div>
		<Typography variant="caption">{label}</Typography>
	</div>
</div>
