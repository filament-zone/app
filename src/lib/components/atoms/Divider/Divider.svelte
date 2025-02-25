<script lang="ts">
	interface Props {
		[key: string]: any
	}

	let { ...props }: Props = $props();
</script>

<div class="divider {props.class}"></div>

<style lang="less">
	.divider {
		width: 100%;
		border: 0.5px solid var(--default-border);
	}
</style>
