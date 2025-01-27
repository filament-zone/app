<script lang="ts">
	import { CheckCircleIcon, MinusCircleIcon } from 'svelte-feather-icons';
	import { campaignDetailsStore, Modal, modalStore } from '$lib/features';
	import { Button, ToggleContentCard, ToggleContentContainer, Typography } from '$lib/components';
	import { type ICampaign, type TToggleContentContainerSelected } from '$lib/types';

	const { modalConfig } = modalStore;
	const { voteCampaignCriteria } = campaignDetailsStore;

	$: state = $modalConfig.state as { campaignId: ICampaign['id'] };

	let toggleSelected: TToggleContentContainerSelected = 'isFirst';

	const handleVote = () => {
		voteCampaignCriteria(state.campaignId, toggleSelected === 'isFirst' ? 'Approved' : 'Rejected');
	};
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">Vote</Typography>
	</div>
	<div slot="content">
		<Typography variant="caption"
			>As a delegate, your mission is to represent your delegators interests and evaluate whether
			the proposed airdrop criteria are aligned with your professional opinion. Please select one of
			the options below to contribute with your voting power to the decision making of this airdrop.
		</Typography>
		<br />
		<br />
		<Typography variant="caption">
			Please be aware that once voted, you cannot change your decision anymore.
		</Typography>
		<br />
		<br />
		<ToggleContentContainer bind:selected={toggleSelected}>
			<ToggleContentCard slot="first">
				<div slot="label" class="flex flex-row gap-4">
					<CheckCircleIcon class={toggleSelected === 'isFirst' ? 'text-upOnly' : 'text-gray'} />
					<Typography variant="caption">Yes</Typography>
				</div>
				<Typography variant="caption" slot="content"
					>The airdrop criteria proposed by the campaigner <strong>do</strong> sufficiently represent
					the expectation of your delegators and are aligned with your professional opinion. You hereby
					reject this proposal.</Typography
				>
			</ToggleContentCard>
			<ToggleContentCard slot="second">
				<div slot="label" class="flex flex-row gap-4">
					<MinusCircleIcon class={toggleSelected === 'isSecond' ? 'text-rugged' : 'text-gray'} />
					<Typography variant="caption">No</Typography>
				</div>
				>
				<Typography variant="caption" slot="content"
					>The airdrop criteria proposed by the campaigner <strong>do not</strong> sufficiently meet
					your expectations and are not aligned with you professional opinion. You hereby reject this
					proposal.</Typography
				>
			</ToggleContentCard>
		</ToggleContentContainer>

		<Button on:click={handleVote} class="ml-auto mt-8" variant="secondary">Confirm Vote</Button>
	</div>
</Modal>

<style lang="less">
</style>
