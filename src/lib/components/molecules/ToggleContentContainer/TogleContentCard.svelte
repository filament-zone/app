<script lang="ts">
	import { Divider } from '$lib/components';
</script>

<div class="toggle-content-card">
	<div class="card-content">
		<slot name="label" />
	</div>
	<Divider />
	<div class="card-content">
		<slot name="content" />
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
