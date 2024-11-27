<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ICardProps } from '$lib/types';

	export let label: ICardProps['label'] = '';
</script>

<div class={`card ${$$props.class} p-2`}>
	<Typography variant="caption">{label}</Typography>
	<slot />
</div>

<style lang="less">
	.card {
		display: flex;
		flex-direction: column;
		border: 0.5px solid var(--default-border);
		background-color: var(--darkNet);
		border-radius: 4px;
	}
</style>
