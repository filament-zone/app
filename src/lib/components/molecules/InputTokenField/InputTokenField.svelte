<script lang="ts">
	import { Input, InputTextContainer, TokenIconNameContainer } from '$lib/components';
	import { EInputSizeVariant, type IInputTokenFieldProps } from '$lib/types';

	interface Props {
		onChange: IInputTokenFieldProps['onChange'];
		onMaxClick: IInputTokenFieldProps['onMaxClick'];
		inputProps: IInputTokenFieldProps['inputProps'];
		tokenProps: IInputTokenFieldProps['tokenProps'];
	}

	let {
		onChange,
		onMaxClick,
		inputProps,
		tokenProps
	}: Props = $props();
</script>

<div class="flex flex-row w-full">
	<TokenIconNameContainer tokenIcon={tokenProps.tokenIcon} tokenTicker={tokenProps.tokenTicker} />
	<Input
		style="border-top-left-radius: 0; border-bottom-left-radius: 0"
		sizeVariant={EInputSizeVariant.FULL_WIDTH}
		{...inputProps}
		onInput={onChange}
		placeholder="0.00"
		RightIcon={InputTextContainer}
		RightIconProps={{
			label: 'Max',
			onClick: onMaxClick
		}}
	/>
</div>
