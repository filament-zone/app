<script lang="ts">
	import { Button, SearchSelect } from '$lib/components';
	import { type ILiveProposalsTableLabelComponentProps } from '$lib/types';

	let { searchSelectProps, buttonProps }: ILiveProposalsTableLabelComponentProps = $props();
</script>

<div class="flex flex-col items-end md:flex-row md:gap-4">
	<SearchSelect {...searchSelectProps} />
	<Button
		{...buttonProps}
		onclick={(e) => {
			if (buttonProps?.onclick) {
				buttonProps?.onclick(e);
			}
		}}>Create Proposal</Button
	>
</div>
