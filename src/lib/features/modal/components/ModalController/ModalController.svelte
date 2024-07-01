<script>
	import { derived } from 'svelte/store';
	import { modalStore, navigationStore, ModalConfirmation } from '$lib/features';
	import { EModalVariant } from '$lib/types';

	const { beforeNavigate } = navigationStore;
	const { closeModal } = modalStore;

	const { activeModal } = modalStore;

	beforeNavigate(() => {
		closeModal();
	});

	const mainModal = derived(activeModal, () => {
		switch ($activeModal) {
			case EModalVariant.CLOSED:
				return null;
			case EModalVariant.CONFIRMATION:
				return ModalConfirmation;
			default:
				return null;
		}
	});
</script>

<div class="modal">
	<svelte:component this={$mainModal} />
</div>
