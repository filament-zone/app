<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, modalStore } from '$lib/features';
	import { Button, Typography, TimeLineItem } from '$lib/components';
	import { type ITimeLineItemProps, ETimeLineItem } from '$lib/types';

	const { closeModal } = modalStore;

	const step = writable<number>(1);

	const timeLine1 = {
		iconStatus: ETimeLineItem.CHECKED,
		title: 'Vote Submitted',
		description: 'The vote has been submitted',
		isFirst: true
	};

	const timeLine2 = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Vote Received',
		description: 'The vote has been received and is being processed',
		isLast: true
	};

	const modalConfig: Record<
		number,
		{
			timeLine1: ITimeLineItemProps;
			timeLine2: ITimeLineItemProps;
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
				iconStatus: ETimeLineItem.CHECKED
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
			<TimeLineItem {...modalConfig[$step].timeLine2} />
			<TimeLineItem {...modalConfig[$step].timeLine1} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
