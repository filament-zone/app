<script lang="ts">
	import { Button } from '$lib/components';
	import { EButtonVariant, type ITemplateSegmentRightSideBarProps } from '$lib/types';

	export let label: ITemplateSegmentRightSideBarProps['label'];
	export let onButtonClick: ITemplateSegmentRightSideBarProps['onButtonClick'];
	export let buttonLabel: ITemplateSegmentRightSideBarProps['buttonLabel'] = 'Save Changes';
	export let description: ITemplateSegmentRightSideBarProps['description'] = 'Segment';
	export let buttonColorVariant: ITemplateSegmentRightSideBarProps['buttonColorVariant'] =
		EButtonVariant.PRIMARY;
</script>

<div class="flex flex-col justify-between h-full">
	<div class="flex flex-col gap-8">
		<div class="label">
			<span>{description}</span>
			<span>{label}</span>
		</div>
		<slot />
	</div>
	<div class="flex flex-row justify-end">
		<Button value={buttonLabel} styleVariant={buttonColorVariant} on:click={onButtonClick} />
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
