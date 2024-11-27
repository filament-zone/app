<script lang="ts">
	import { Dropdown, Typography } from '$lib/components/';
	import { EDropdownSizeVariant, type IPricingComponentProps } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	export let label: IPricingComponentProps['label'] = '';
	export let requiredLabel: IPricingComponentProps['requiredLabel'] = '';
	export let dropdownOptions: IPricingComponentProps['dropdownOptions'] = [];
	export let dropdownValue: IPricingComponentProps['dropdownValue'] = null;
	export let isActive: IPricingComponentProps['isActive'] = false;
</script>

<div
	class="pricing-component-container {$$props.class} {isActive ? '' : 'inactive'}"
	on:click
	aria-hidden="true"
>
	<div class="flex flex-row items-center justify-start p-4 gap-4 w-full">
		<CheckmarkCircleIcon fill="var(--upOnly-400)" />
		<Typography variant="subtitle2">{label}</Typography>
	</div>
	<div class="p-4 w-full">
		<div class="flex flex-row justify-between items-center">
			<Typography variant="overline">Required {requiredLabel}</Typography>
			<Typography variant="overline">Balance: 54,300</Typography>
		</div>
		<div class="pricing-component">
			<Typography variant="overline" color="var(--upOnly-400)">40,000</Typography>
			<Dropdown
				options={dropdownOptions}
				sizeVariant={EDropdownSizeVariant.SMALL}
				bind:value={dropdownValue}
				disabled={!isActive}
			/>
		</div>
	</div>
</div>

<style lang="less">
	.pricing-component-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 0 20px;

		background: #1b1b1b;
		border: 1px solid #272727;
		border-radius: 4px;
	}

	.inactive {
		opacity: 0.5;
	}

	.pricing-component {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px;
		margin-top: 8px;
		background: #141414;
		border: 1px solid #272727;
	}
</style>
