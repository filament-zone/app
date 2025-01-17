<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ICardProps } from '$lib/types';

	export let label: ICardProps['label'] = '';
</script>

<div class={`card ${$$props.class} p-2`}>
	<Typography variant="caption">{label}</Typography>
	<div class="card-content">
		<slot />
	</div>
</div>

<style lang="less">
	.card {
		display: flex;
		flex-direction: column;
		border-radius: 4px;

		.card-content {
			margin-top: 8px;
			padding: 16px;
			border: 1px solid var(--default-border);
			background: var(--highlight-bg, #1b1b1b);
			border-radius: 4px;
		}
	}
</style>
