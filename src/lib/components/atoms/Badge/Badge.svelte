<script lang="ts">
	import { Typography } from '$lib/components';
	import { EBadgeColorVariant, EBadgeWidthVariant, type IBadgeProps } from '$lib/types';

	export let label: IBadgeProps['label'];
	export let colorVariant: IBadgeProps['colorVariant'] = EBadgeColorVariant.PRIMARY;
	export let widthVariant: IBadgeProps['widthVariant'] = EBadgeWidthVariant.FIT_CONTENT;
	export let LeftContent: IBadgeProps['LeftContent'] = null;
	export let RightContent: IBadgeProps['RightContent'] = null;
	export let textColor: IBadgeProps['textColor'] = '';
	export let RightContentColorVariant: IBadgeProps['RightContentColorVariant'] = '';

	function getColor(colorVariant: EBadgeColorVariant): string {
		switch (colorVariant) {
			case EBadgeColorVariant.PRIMARY:
				return 'var(--primary-white)';
			case EBadgeColorVariant.SECONDARY:
				return 'var(--gray-100)';
			case EBadgeColorVariant.SUCCESS:
				return 'var(--upOnly)';
			case EBadgeColorVariant.REJECTED:
				return 'var(--rugged)';
			case EBadgeColorVariant.IN_PROGRESS:
				return 'var(--purpleCow)';
			case EBadgeColorVariant.FAILED:
				return 'var(--yellowPaper)';
			default:
				return 'var(--primary-white)';
		}
	}
</script>

<div
	{...$$props}
	class={`${widthVariant} badge ${$$props.class} ${colorVariant} `}
	on:click
	aria-hidden="true"
>
	{#if LeftContent}
		<div class="item item-1 mr-2">
			{#if typeof LeftContent === 'string'}
				<span class="side-content">{LeftContent}</span>
			{:else}
				<svelte:component this={LeftContent} stroke="white" width="12px" height="12px" />
			{/if}
		</div>
	{/if}
	<div class="item item-2">
		<Typography variant="caption" color={textColor ? textColor : getColor(colorVariant)}
			>{label}</Typography
		>
	</div>
	{#if RightContent}
		<div class="item item-3 ml-2">
			{#if typeof RightContent === 'string'}
				<span class="side-content content-variant-{RightContentColorVariant}">{RightContent}</span>
			{:else}
				<svelte:component this={RightContent} />
			{/if}
		</div>
	{/if}
</div>

<style lang="less">
	.badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 4px;
		padding: 8px;
		height: 35px;

		&.primary {
			border: 0.5px solid var(--default-border);
			background-color: var(--darkNet);
		}

		&.secondary {
			border: 0.5px solid var(--default-border);
			background-color: var(--darkNet-100);
		}

		&.success {
			border: 0.5px solid var(--upOnly);
			background-color: var(--darkNet);
		}

		&.in-progress {
			border: 0.5px solid var(--purpleCow);
			background-color: var(--darkNet);
		}

		&.rejected {
			border: 0.5px solid var(--rugged);
			background-color: var(--darkNet);
		}

		&.failed {
			border: 0.5px solid var(--yellowPaper);
			background-color: var(--darkNet);
		}

		.side-content {
			font-family: var(--primary-font);
			font-size: 12px;
			font-weight: 400;
			line-height: 1.5;
			color: var(--gray-200);
		}

		.content-variant-purple {
			color: var(--Purple-CoW, #b7abfc);
			font-family: var(--secondary-font);
			font-size: 12px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
		}
	}
</style>
