<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, modalStore } from '$lib/features';
	import { Button, Typography } from '$lib/components';

	const { closeModal } = modalStore;

	const campaignVoteState = writable({
		isYes: {
			selected: true
		},
		isNo: {
			selected: false
		}
	});

	const toggleVote = (vote: 'isYes' | 'isNo') => {
		campaignVoteState.update((state) => {
			state.isYes.selected = vote === 'isYes';
			state.isNo.selected = vote === 'isNo';
			return state;
		});
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
		<div on:click={toggleVote.bind(null, 'isYes')} aria-hidden="true">
			<div>
				<span>Yes</span>
			</div>
			<div>
				<span
					>The airdrop criteria proposed by the campaigner do sufficiently represent the expectation
					of your delegators and are aligned with your professional opinion. You hereby reject this
					proposal.</span
				>
			</div>
		</div>
		<div class="divider">
			<Typography variant="subtitle2">or</Typography>
		</div>
		<div on:click={toggleVote.bind(null, 'isNo')} aria-hidden="true">
			<div>
				<span>No</span>
			</div>
			<div>
				<span
					>The airdrop criteria proposed by the campaigner do not sufficiently meet your
					expectations and are not aligned with you professional opinion. You hereby reject this
					proposal.</span
				>
			</div>
		</div>
		<Button on:click={closeModal} class="ml-auto mt-8" variant="secondary">Confirm</Button>
	</div>
</Modal>

<style lang="less">
	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin: 20px 0;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #ffffff;
		margin: 0 10px;
	}
</style>
