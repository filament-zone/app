<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignDeposit } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Deposit'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalCampaignDeposit }} />
