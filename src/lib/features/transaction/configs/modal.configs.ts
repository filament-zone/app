import type { TModalTransactionConfig } from '$lib/types';

export const voteTransactionModalConfig: TModalTransactionConfig = {
	1: {
		title: 'Vote Submitted',
		description: 'The vote has been submitted',
		phase: '-1'
	},
	2: {
		title: 'Vote Received',
		description: 'The vote has been received and is being processed',
		phase: '0'
	}
};
