<script lang="ts">
	import { type IInputTextContainerProps } from '$lib/types';
	import { Typography } from '$lib/components';

	export let label: IInputTextContainerProps['label'];
	export let onClick: IInputTextContainerProps['onClick'];
</script>

<div class="input-text-container" {...$$props} on:click={onClick} aria-hidden="true">
	<Typography variant="button">{label}</Typography>
</div>

<style lang="less">
	.input-text-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		cursor: pointer;

		background: var(--gray-200);
		padding: 0 4px;
		border-radius: 4px;
		height: 22px;
	}
</style>
