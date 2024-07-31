<script lang="ts">
	import type { IListItemProps } from '$lib/types';
	import { Typography } from '$lib/components';

	export let option: IListItemProps['option'] = null;
	export let selected: IListItemProps['selected'] = false;
	export let isPlaceholder: IListItemProps['isPlaceholder'] = false;
</script>

<div
	class="list-item-component py-1 px-4 cursor-pointer"
	class:selected
	class:disabled={option?.disabled}
	class:isPlaceholder
	on:click
	aria-hidden="true"
	data-testId={`list-item-${option?.value}`}
>
	{#if typeof option?.icon === 'string'}
		<img src={option.icon} alt="token-icon" style="height: 14px; width: 14px" />
	{:else}
		<svelte:component this={option?.icon} />
	{/if}
	<Typography variant="h6">{option?.label}</Typography>
	{#if option?.valueSecondary}
		<span class="value-secondary"> {option?.valueSecondary}</span>
	{/if}
</div>

<style lang="less">
	.selected {
		span {
			color: #00ffff !important;
		}
	}

	.value-secondary {
		margin-left: auto;
		color: #b8b8b8 !important;
		font-size: 13px;
		font-style: normal;
		font-weight: 300;
		line-height: 13px;
	}

	.isPlaceholder {
		cursor: default;
		text-align: center;
		span {
			color: white !important;
		}
	}

	.list-item-component {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		background-color: black;
		border-radius: 4px;
		gap: 6px;
		padding: 8px 12px;

		span {
			color: white;
			font-family: 'ff-meta-serif-web-pro', serif;
			font-size: 14px;
			font-style: normal;
			font-weight: 500;
			line-height: 16px;
		}

		&:hover {
			span {
				color: #00ffff !important;
			}
		}
	}
	.disabled {
		span {
			color: gray !important;
			cursor: not-allowed;
		}

		&:hover {
			span {
				color: gray !important;
			}
		}
	}
</style>
