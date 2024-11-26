<script lang="ts">
	import { Typography } from '$lib/components';
	import { EBadgeColorVariant, EBadgeWidthVariant, type IBadgeProps } from '$lib/types';

	export let label: IBadgeProps['label'];
	export let colorVariant: IBadgeProps['colorVariant'] = EBadgeColorVariant.PRIMARY;
	export let widthVariant: IBadgeProps['widthVariant'] = EBadgeWidthVariant.FULL;
	export let LeftContent: IBadgeProps['LeftContent'] = null;
	export let RightContent: IBadgeProps['RightContent'] = null;

	function getColor(colorVariant: EBadgeColorVariant): string {
		switch (colorVariant) {
			case EBadgeColorVariant.PRIMARY:
				return 'var(--primary-white)';
			case EBadgeColorVariant.SECONDARY:
				return '#898989';
			case EBadgeColorVariant.SUCCESS:
				return 'var(--default)';
			case EBadgeColorVariant.DANGER:
				return 'var(--primary-white)';
			case EBadgeColorVariant.WARNING:
				return 'var(--default)';
			case EBadgeColorVariant.INFO:
				return 'var(--primary-white)';
			case EBadgeColorVariant.LIGHT:
				return 'var(--default)';
			default:
				return 'var(--default)';
		}
	}

	function getIconTextColor(colorVariant: EBadgeColorVariant): string {
		switch (colorVariant) {
			case EBadgeColorVariant.PRIMARY:
				return '#898989';
			case EBadgeColorVariant.SECONDARY:
				return '#898989';
			default:
				return '#898989';
		}
	}
</script>

<div
	{...$$props}
	class={`badge ${$$props.class} ${colorVariant} ${widthVariant}`}
	on:click
	aria-hidden="true"
>
	{#if LeftContent}
		<div class="item item-1 mr-2">
			{#if typeof LeftContent === 'string'}
				<Typography variant="caption" color={getIconTextColor(colorVariant)}
					>{LeftContent}</Typography
				>
			{:else}
				<svelte:component this={LeftContent} stroke="white" width="12px" height="12px" />
			{/if}
		</div>
	{/if}
	<div class="item item-2">
		<Typography variant="caption" color={getColor(colorVariant)}>{label}</Typography>
	</div>
	{#if RightContent}
		<div class="item item-3 ml-2">
			{#if typeof RightContent === 'string'}
				<Typography variant="caption" color={getIconTextColor(colorVariant)}
					>{RightContent}</Typography
				>
			{:else}
				<svelte:component this={RightContent} />
			{/if}
		</div>
	{/if}
</div>

<style lang="less">
	.badge {
		display: flex;
		position: relative;
		align-items: center;
		width: fit-content;
		gap: 0.5rem;
		border-radius: 4px;
		padding: 8px;
		height: 35px;

		&.primary {
			border: 1px solid var(--default-border);
			background: #282828;
		}

		&.secondary {
			border: 1px solid var(--default-border);
			background-color: var(--content1);
		}

		&.success {
			box-shadow: 0 0 0 0.1px var(--green-200);
			background-color: var(--green-100);
		}

		&.danger {
			box-shadow: 0 0 0 0.1px var(--red-200);
			background-color: var(--red-100);
		}

		&.warning {
			box-shadow: 0 0 0 0.1px var(--orange-200);
			background-color: var(--yellow);
		}

		&.info {
			box-shadow: 0 0 0 0.1px var(--blue-200);
			background-color: var(--blue-100);
		}

		&.light {
			box-shadow: 0 0 0 0.1px var(--filaMint-600);
			background-color: var(--foreground);
		}

		&.dark {
			box-shadow: 0 0 0 0.1px var(--filaMint-700);
			background-color: var(--background);
		}
	}
</style>
