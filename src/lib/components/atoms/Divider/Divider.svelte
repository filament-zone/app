<script lang="ts">
	import type { IDividerProps } from '$lib/types';

	let { classNames }: IDividerProps = $props();
</script>

<div class="divider {classNames}"></div>

<style lang="less">
	.divider {
		width: 100%;
		border: 0.5px solid var(--default-border);
	}
</style>
