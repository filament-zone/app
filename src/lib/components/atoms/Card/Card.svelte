<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ICardProps } from '$lib/types';

	export let label: ICardProps['label'] = '';
</script>

<div class={`card ${$$props.class} `}>
	<Typography variant="caption">{label}</Typography>
	<slot />
</div>

<style lang="less">
	.card {
		box-shadow: 0 0 0 0.1px var(--primary-white);
		background-color: var(--content1);
		padding: 10px;
		border-radius: 4px;
	}
</style>
