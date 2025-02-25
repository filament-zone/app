<script lang="ts">
	import { CheckCircleIcon, MinusCircleIcon } from 'svelte-feather-icons';
	import { campaignDetailsStore, Modal, modalStore } from '$lib/features';
	import { Button, ToggleContentCard, ToggleContentContainer, Typography } from '$lib/components';
	import {
		EButtonStyleVariant,
		ECampaignPhase,
		type ICampaign,
		type TToggleContentContainerSelected
	} from '$lib/types';

	const { modalConfig } = modalStore;
	const { voteCampaignCriteria, voteCampaignDistribution, campaignDetails } = campaignDetailsStore;

	let modalState = $derived($modalConfig.state as { campaignId: ICampaign['id'] });

	let toggleSelected = $state('isFirst' as TToggleContentContainerSelected);

	let handleVote = $derived(() => {
		const value = toggleSelected === 'isFirst' ? 'Approved' : 'Rejected';
		if ($campaignDetails?.phase === ECampaignPhase.CRITERIA) {
			voteCampaignCriteria(modalState.campaignId, value);
		} else if ($campaignDetails?.phase === ECampaignPhase.DISTRIBUTION_VOTING) {
			voteCampaignDistribution(modalState.campaignId, value);
		}
	});
</script>

<Modal classNames="max-w-96">
	{#snippet header()}
		<div>
			<Typography variant="h5">Vote</Typography>
		</div>
	{/snippet}
	{#snippet content()}
		<div>
			<Typography variant="caption"
				>As a delegate, your mission is to represent your delegators interests and evaluate whether
				the proposed airdrop criteria are aligned with your professional opinion. Please select one
				of the options below to contribute with your voting power to the decision making of this
				airdrop.
			</Typography>
			<br />
			<br />
			<Typography variant="caption">
				Please be aware that once voted, you cannot change your decision anymore.
			</Typography>
			<br />
			<br />
			<ToggleContentContainer bind:selected={toggleSelected}>
				{#snippet first()}
					<ToggleContentCard>
						{#snippet label()}
							<div class="flex flex-row gap-4">
								<CheckCircleIcon
									class={toggleSelected === 'isFirst' ? 'text-upOnly' : 'text-gray'}
									size="12px"
								/>
								<Typography variant="caption">Yes</Typography>
							</div>
						{/snippet}
						{#snippet content()}
							<Typography variant="caption"
								>The airdrop criteria proposed by the campaigner <strong>do</strong> sufficiently represent
								the expectation of your delegators and are aligned with your professional opinion. You
								hereby reject this proposal.</Typography
							>
						{/snippet}
					</ToggleContentCard>
				{/snippet}
				{#snippet second()}
					<ToggleContentCard>
						{#snippet label()}
							<div class="flex flex-row gap-4">
								<MinusCircleIcon
									class={toggleSelected === 'isSecond' ? 'text-rugged' : 'text-gray'}
									size="12px"
								/>
								<Typography variant="caption">No</Typography>
							</div>
							>
						{/snippet}
						{#snippet content()}
							<Typography variant="caption"
								>The airdrop criteria proposed by the campaigner <strong>do not</strong> sufficiently
								meet your expectations and are not aligned with you professional opinion. You hereby
								reject this proposal.</Typography
							>
						{/snippet}
					</ToggleContentCard>
				{/snippet}
			</ToggleContentContainer>
			<Button onclick={handleVote} class="ml-auto mt-8" styleVariant={EButtonStyleVariant.SECONDARY}
				>Confirm Vote</Button
			>
		</div>
	{/snippet}
</Modal>
