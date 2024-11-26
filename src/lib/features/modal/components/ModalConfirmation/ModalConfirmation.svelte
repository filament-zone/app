<script lang="ts">
	import { Modal, modalStore } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import {
		EButtonStyleVariant,
		EButtonSizeVariant,
		type IModalConfirmationProps
	} from '$lib/types';

	const { modalConfig, closeModal } = modalStore;

	$: state = $modalConfig.state as IModalConfirmationProps;
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">{state?.title ?? 'Confirmation modal'}</Typography>
	</div>
	<div slot="content" class="text-center flex flex-col gap-12">
		<Typography variant="h4">{state?.description ?? 'Are you sure?'}</Typography>
		<div class="flex flex-row justify-between gap-6">
			{#if !state?.disabledDeny}
				<Button
					data-testid="confirmation-modal-cancel"
					styleVariant={EButtonStyleVariant.SECONDARY}
					sizeVariant={EButtonSizeVariant.FULL_WIDTH}
					on:click={() => {
						if (state?.onDeny) {
							state?.onDeny();
						}
						closeModal();
					}}>{state?.onDenyLabel ?? 'Cancel'}</Button
				>
			{/if}
			<Button
				data-testid="confirmation-modal-confirm"
				sizeVariant={EButtonSizeVariant.FULL_WIDTH}
				on:click={() => {
					if (state?.onConfirm) {
						state?.onConfirm();
					}
					closeModal();
				}}>{state?.onConfirmLabel ?? 'Confirm'}</Button
			>
		</div>
	</div>
</Modal>
