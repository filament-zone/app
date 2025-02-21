<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignVote } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Vote'
	};
</script>

<Template >
	{#snippet children({ args })}
		<args.modal {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ modal: ModalCampaignVote }} />
