<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignDepositTimeline } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Deposit Time Line'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalCampaignDepositTimeline }} />
