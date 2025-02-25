<script lang="ts">
	import { Button, SearchSelect } from '$lib/components';
	import { type ILiveProposalsTableLabelComponentProps } from '$lib/types';

	interface Props {
		searchSelectProps: ILiveProposalsTableLabelComponentProps['searchSelectProps'];
		buttonProps: ILiveProposalsTableLabelComponentProps['buttonProps'];
	}

	let { searchSelectProps, buttonProps }: Props = $props();
</script>

<div class="flex flex-col items-end md:flex-row md:gap-4">
	<SearchSelect {...searchSelectProps} />
	<Button {...buttonProps} on:click={buttonProps.onClick}>Create Proposal</Button>
</div>
