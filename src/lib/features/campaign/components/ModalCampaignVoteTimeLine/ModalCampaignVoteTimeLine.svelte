<script lang="ts">
	import { writable } from 'svelte/store';
	import { CampaignTimeLineItem, Modal, modalStore } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { type ICampaignTimeLineItemProps } from '$lib/types';
	import { ECampaignTimeLineItem } from '$lib/features/campaign/components/CampaignListItem/components/CampaginTimeLineItem/CampaignTimeLineItem.enums';

	const { closeModal } = modalStore;

	const step = writable<number>(1);

	const timeLine1 = {
		iconStatus: ECampaignTimeLineItem.CHECKED,
		title: 'Vote Submitted',
		description: 'The vote has been submitted',
		isFirst: true
	};

	const timeLine2 = {
		iconStatus: ECampaignTimeLineItem.PROCESSING,
		title: 'Vote Received',
		description: 'The vote has been received and is being processed',
		isLast: true
	};

	const modalConfig: Record<
		number,
		{
			timeLine1: ICampaignTimeLineItemProps;
			timeLine2: ICampaignTimeLineItemProps;
		}
	> = {
		1: {
			timeLine1,
			timeLine2
		},
		2: {
			timeLine1,
			timeLine2: {
				...timeLine2,
				iconStatus: ECampaignTimeLineItem.CHECKED
			}
		}
	};
</script>

<Modal classNames="max-w-96" closeOnClickOutside={false}>
	<div slot="header">
		<Typography variant="h5">Deposit Campaign Collateral</Typography>
	</div>
	<div slot="content">
		<div>
			<CampaignTimeLineItem {...modalConfig[$step].timeLine2} />
			<CampaignTimeLineItem {...modalConfig[$step].timeLine1} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
