<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
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
		background: var(--highlight-bg);
		border: 0.5px solid var(--default-border);
		color: #fff;
		font-family: var(--secondary-font);
		font-style: normal;
		font-weight: 400;

		padding: 8px 14px;
		width: 100%;
		min-height: 30px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		&::placeholder:not(:disabled) {
			opacity: 0.4;
		}

		&:focus-visible {
			outline: none;
		}

		&:focus-within {
			border-color: gray;
		}

		&:disabled {
			background-color: var(--darkNet);
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
</style>
