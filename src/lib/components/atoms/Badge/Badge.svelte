<script lang="ts">
	import { Typography } from '$lib/components';
	import { EBadgeColorVariant, EBadgeWidthVariant, type IBadgeProps } from '$lib/types';

	export let label: IBadgeProps['label'];
	export let colorVariant: IBadgeProps['colorVariant'] = EBadgeColorVariant.PRIMARY;
	export let widthVariant: IBadgeProps['widthVariant'] = EBadgeWidthVariant.FULL;
	export let LeftIcon: IBadgeProps['LeftIcon'] = null;
	export let RightIcon: IBadgeProps['RightIcon'] = null;

	function getColor(colorVariant: string): string {
		switch (colorVariant) {
			case EBadgeColorVariant.PRIMARY:
				return 'var(--primary-white)';
			case EBadgeColorVariant.SECONDARY:
				return 'var(--default)';
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

	function getIconTextColor(colorVariant: string): string {
		switch (colorVariant) {
			case EBadgeColorVariant.PRIMARY:
				return 'var(--gray-200)';
			case EBadgeColorVariant.SECONDARY:
				return 'var(--filaMint-600)';
			default:
				return 'var(--default)';
		}
	}
</script>

<div class={`badge ${$$props.class} ${colorVariant} ${widthVariant}`}>
	{#if LeftIcon}
		<div class="item item-1 mr-2">
			{#if typeof LeftIcon === 'string'}
				<Typography variant="caption" color={getIconTextColor(colorVariant)}>{LeftIcon}</Typography>
			{:else}
				<svelte:component this={LeftIcon} stroke="white" width="12px" height="12px" />
			{/if}
		</div>
	{/if}
	<div class="item item-2">
		<Typography variant="caption" color={getColor(colorVariant)}>{label}</Typography>
	</div>
	{#if RightIcon}
		<div class="item item-3 ml-2">
			{#if typeof RightIcon === 'string'}
				<Typography variant="caption" color={getIconTextColor(colorVariant)}>{RightIcon}</Typography
				>
			{:else}
				<svelte:component this={RightIcon} />
			{/if}
		</div>
	{/if}
</div>

<style lang="less">
	.badge {
		display: flex;
		position: relative;

		border-radius: 4px;
		padding: 4px 8px;
		height: 35px;

		.item {
			position: absolute;
			margin: auto 0;
		}

		.item-1 {
			left: 8px;
		}

		.item-2 {
			left: 50%;
			transform: translateX(-50%);
		}

		.item-3 {
			right: 8px;
		}

		&.primary {
			box-shadow: 0 0 0 0.1px var(--primary-white);
			background-color: var(--content1);
		}

		&.secondary {
			box-shadow: 0 0 0 0.1px var(--filaMint-300);
			background-color: var(--filaMint-100);
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
