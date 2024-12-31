<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignVote } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Vote TimeLine'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalCampaignVote }} />
