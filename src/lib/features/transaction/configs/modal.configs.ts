import type { TModalTransactionConfig } from '$lib/types';

export const voteTransactionModalConfig: TModalTransactionConfig = {
	common: {
		title: 'Vote',
		description:
			'As a delegate, your mission is to represent your delegators interests and evaluate whether the proposed airdrop criteria are aligned with your professional opinion.  Please select one of the options below to contribute with your voting power to the decision making of this airdrop.'
	},
	timeLine: {
		1: {
			title: 'Vote Submitted',
			description: 'The vote has been submitted'
		},
		2: {
			title: 'Vote Received',
			description: 'The vote has been received and is being processed'
		}
	}
};
