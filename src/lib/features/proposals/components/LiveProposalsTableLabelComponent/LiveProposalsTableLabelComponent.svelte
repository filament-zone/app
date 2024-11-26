<script lang="ts">
	import { Button, SearchSelect } from '$lib/components';
	import UploadIcon from '$lib/assets/icons/upload.svg?component';
	import { type ILiveProposalsTableLabelComponentProps } from '$lib/types';

	export let searchSelectProps: ILiveProposalsTableLabelComponentProps['searchSelectProps'];
	export let buttonProps: ILiveProposalsTableLabelComponentProps['buttonProps'];
</script>

<div class="flex flex-col items-end md:flex-row md:gap-4">
	<SearchSelect {...searchSelectProps} />
	<Button LeftContent={UploadIcon} {...buttonProps} on:click={buttonProps.onClick}
		>Create new proposal</Button
	>
</div>
