<script lang="ts">
	import { Input, InputTextContainer, TokenIconNameContainer } from '$lib/components';
	import { EInputSizeVariant, type IInputTokenFieldProps } from '$lib/types';

	let { onChange, onMaxClick, inputProps, tokenProps }: IInputTokenFieldProps = $props();
</script>

<div class="flex flex-row w-full">
	<TokenIconNameContainer tokenIcon={tokenProps.tokenIcon} tokenTicker={tokenProps.tokenTicker} />

	<Input
		{...inputProps}
		styles="border-top-left-radius: 0; border-bottom-left-radius: 0"
		sizeVariant={EInputSizeVariant.FULL_WIDTH}
		onInput={onChange}
		placeholder="0.00"
		RightIcon={InputTextContainer}
		RightIconProps={{
			label: 'Max',
			onClick: onMaxClick
		}}
	/>
</div>
