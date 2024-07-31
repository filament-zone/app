<script lang="ts">
	import { Button } from '$lib/components';
	import { EModalVariant, type ITableNetworkComponentProps } from '$lib/types';
	import { modalStore } from '$lib/features';

	export let validatorId: ITableNetworkComponentProps['Icon'];

	const { openModal } = modalStore;

	const handleStake = () => {
		openModal({ variant: EModalVariant.VALIDATOR_STAKE, state: { validatorId } });
	};
</script>

<div class="flex flex-row items-center">
	<Button on:click={handleStake}>Stake</Button>
</div>
