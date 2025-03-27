<script lang="ts">
	import { Divider } from '$lib/components';
	import { type IToggleContentCardProps } from '$lib/types';

	let { label, content }: IToggleContentCardProps = $props();
</script>

<div class="toggle-content-card">
	<div class="card-content">
		{@render label?.()}
	</div>
	<Divider />
	<div class="card-content">
		{@render content?.()}
	</div>
</div>

<style lang="less">
	.toggle-content-card {
		display: flex;
		flex-direction: column;
		padding: 8px;
		background: var(--highlight-bg);
		border: 0.5px solid var(--default-border);
		border-radius: 4px;

		.card-content {
			padding: 8px 0;
		}
	}
</style>
