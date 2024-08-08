<script lang="ts">
	import { Label, Typography } from '$lib/components';
	import { type ITextAreaProps } from '$lib/types';

	export let label: ITextAreaProps['label'] = '';
	export let error: ITextAreaProps['error'] = '';
	export let value: ITextAreaProps['value'] = '';
</script>

<div class={`${$$props.class} rounded-none`}>
	<div>
		{#if label}
			<Label value={label} />
		{/if}
		<textarea bind:value rows="4" {...$$restProps}></textarea>
		{#if error}
			<Typography variant="labelSmall" color="red">{error}</Typography>
		{/if}
	</div>
</div>

<style lang="less">
	textarea {
		border-radius: 4px;
		background: var(--background-100);
		border: 0.4px solid var(--default);
		color: #fff;
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 13px;

		padding: 6px 14px;
		width: 100%;
		min-height: 30px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: transparent;

		&::placeholder:not(:disabled) {
			opacity: 0.4;
		}

		&:focus-visible {
			outline: none;
		}
	}
</style>
