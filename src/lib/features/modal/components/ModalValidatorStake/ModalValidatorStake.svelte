<script lang="ts">
	import { Modal, modalStore } from '$lib/features';
	import { Button, InputTokenField, Typography } from '$lib/components';
	import {
		EButtonSizeVariant,
		type IInputTokenFieldProps,
		type IModalValidatorStakeProps
	} from '$lib/types';
	import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';

	const { modalConfig } = modalStore;

	let state = $derived($modalConfig.state as IModalValidatorStakeProps);

	const inputTokenFieldData: IInputTokenFieldProps = {
		onChange: (val) => {
			console.log(val.target.value);
		},
		tokenProps: {
			tokenIcon: FilamentLogo,
			tokenTicker: 'FILA'
		}
	};
</script>

<Modal classNames="max-w-96">
	{#snippet header()}
		<div >
			<Typography variant="h5">{`Stake to: ${state?.validator?.label}`}</Typography>
		</div>
	{/snippet}
	{#snippet content()}
		<div >
			<Typography variant="h6">Current stake amount: 0 FILA</Typography>
			<InputTokenField {...inputTokenFieldData} />
			<div class="flex justify-end">
				<Typography variant="h6" color="var(--gray-200)">Available: 0.00 FILA</Typography>
			</div>
			<Button sizeVariant={EButtonSizeVariant.FULL_WIDTH} class="mt-8">Stake</Button>
			<div class="estimate-container flex flex-row justify-between mt-8 p-2">
				<Typography variant="h6" color="var(--gray-200)">Estimated fee</Typography>
				<Typography variant="h6" color="var(--gray-200)">- FILA</Typography>
			</div>
		</div>
	{/snippet}
</Modal>

<style lang="less">
	.estimate-container {
		border: 0.5px solid var(--gray-200);
		border-radius: 4px;
	}
</style>
