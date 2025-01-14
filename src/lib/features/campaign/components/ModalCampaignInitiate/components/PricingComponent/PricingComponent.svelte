<script lang="ts">
	import { Dropdown, Typography } from '$lib/components/';
	import { EDropdownSizeVariant, type IPricingComponentProps } from '$lib/types';

	export let requiredLabel: IPricingComponentProps['requiredLabel'] = '';
	export let dropdownOptions: IPricingComponentProps['dropdownOptions'] = [];
	export let dropdownValue: IPricingComponentProps['dropdownValue'] = null;
</script>

<div class="pricing-component-container {$$props.class}" aria-hidden="true">
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
	}

	.pricing-component {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		margin-top: 8px;
		background: #141414;
		border: 1px solid #272727;
	}
</style>
