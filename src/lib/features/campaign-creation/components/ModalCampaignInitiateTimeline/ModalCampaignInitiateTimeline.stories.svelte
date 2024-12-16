<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignInitiateTimeline } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Initiate Time Line'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalCampaignInitiateTimeline }} />
