<script lang="ts">
	import { Modal, modalStore } from '$lib/features';
	import { Button, ToggleContentCard, ToggleContentContainer, Typography } from '$lib/components';
	import { EModalVariant, type TToggleContentContainerSelected } from '$lib/types';
	import { CheckCircleIcon, MinusCircleIcon } from 'svelte-feather-icons';

	const { openModal } = modalStore;

	let toggleSelected: TToggleContentContainerSelected = 'isFirst';

	const handleVote = () => {
		openModal({ variant: EModalVariant.CAMPAIGN_VOTE_TIMELINE });
	};
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">Vote</Typography>
	</div>
	<div slot="content">
		<Typography variant="subtitle2"
			>As a delegate, your mission is to represent your delegators interests and evaluate whether
			the proposed airdrop criteria are aligned with your professional opinion. Please select one of
			the options below to contribute with your voting power to the decision making of this airdrop.
		</Typography>
		<br />
		<Typography variant="subtitle2">
			Please be aware that once voted, you cannot change your decision anymore.
		</Typography>
		<ToggleContentContainer bind:selected={toggleSelected}>
			<ToggleContentCard slot="first">
				<div slot="label" class="flex flex-row gap-4">
					<CheckCircleIcon class={toggleSelected === 'isFirst' ? 'text-upOnly' : 'text-gray'} />
					<Typography variant="caption">Yes</Typography>
				</div>
				<Typography variant="caption" slot="content"
					>The airdrop criteria proposed by the campaigner do sufficiently represent the expectation
					of your delegators and are aligned with your professional opinion. You hereby reject this
					proposal.</Typography
				>
			</ToggleContentCard>
			<ToggleContentCard slot="second">
				<div slot="label" class="flex flex-row gap-4">
					<MinusCircleIcon class={toggleSelected === 'isSecond' ? 'text-rugged' : 'text-gray'} />
					<Typography variant="caption">No</Typography>
				</div>
				>
				<Typography variant="caption" slot="content"
					>The airdrop criteria proposed by the campaigner do not sufficiently meet your
					expectations and are not aligned with you professional opinion. You hereby reject this
					proposal.</Typography
				>
			</ToggleContentCard>
		</ToggleContentContainer>

		<Button on:click={handleVote} class="ml-auto mt-8" variant="secondary">Confirm</Button>
	</div>
</Modal>

<style lang="less">
</style>
