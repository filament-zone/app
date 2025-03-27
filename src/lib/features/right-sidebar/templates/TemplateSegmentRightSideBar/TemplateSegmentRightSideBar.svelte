<script lang="ts">
	import { Button } from '$lib/components';
	import { EButtonStyleVariant, type ITemplateSegmentRightSideBarProps } from '$lib/types';

	let {
		label,
		onButtonClick,
		buttonLabel = 'Save Changes',
		description = 'Segment',
		buttonColorVariant = EButtonStyleVariant.PRIMARY,
		children
	}: ITemplateSegmentRightSideBarProps = $props();
</script>

<div class="flex flex-col justify-between h-full">
	<div class="flex flex-col gap-8">
		<div class="label">
			<span>{description}</span>
			<span>{label}</span>
		</div>
		{@render children?.()}
	</div>
	<div class="flex flex-row justify-end">
		<Button value={buttonLabel} styleVariant={buttonColorVariant} onclick={onButtonClick} />
	</div>
</div>

<style lang="less">
	.label {
		display: flex;
		flex-direction: column;
		gap: 4px;

		span:nth-child(1) {
			color: #b8b8b8;
			font-size: 12px;
			font-style: normal;
			font-weight: 500;
			line-height: 12px;
		}

		span:nth-child(2) {
			color: var(--white);
			font-size: 20px;
			font-style: normal;
			font-weight: 600;
			line-height: 22px;
		}
	}
</style>
