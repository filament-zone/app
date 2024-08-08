<script lang="ts">
	import { modalStore } from '$lib/features';
	import { Button, List, MenuPopover } from '$lib/components';
	import MoreHorizontalIcon from '$lib/assets/icons/more-horizontal.svg?component';
	import {
		EModalVariant,
		type IListProps,
		type ITableValidatorOptionsComponentProps
	} from '$lib/types';

	export let validatorId: ITableValidatorOptionsComponentProps['validatorId'];

	const { openModal } = modalStore;

	const handleStake = () => {
		openModal({ variant: EModalVariant.VALIDATOR_STAKE, state: { validatorId } });
	};

	const options: IListProps['options'] = [
		{ value: 'stake', label: 'Stake', onClick: handleStake },
		{ value: 'redelegate', label: 'Redelegate', disabled: true },
		{ value: 'unstake', label: 'Unstake', disabled: true },
		{ value: 'claimRewards', label: 'Claim Rewards', disabled: true }
	];
</script>

<div class="flex flex-row items-center">
	<Button on:click={handleStake} class="mr-4">Stake</Button>
	<MenuPopover>
		<div slot="trigger" class="cursor-pointer">
			<MoreHorizontalIcon />
		</div>
		<List slot="content" {options} />
	</MenuPopover>
</div>
