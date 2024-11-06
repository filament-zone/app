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

	$: state = $modalConfig.state as IModalValidatorStakeProps;

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
	<div slot="header">
		<Typography variant="h5">{`Stake to: ${state?.validatorId ?? '{validatorId}'}`}</Typography>
	</div>
	<div slot="content">
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
</Modal>

<style lang="less">
	.estimate-container {
		box-shadow: 0 0 0 0.3px var(--gray-200);
		border-radius: 4px;
	}
</style>
