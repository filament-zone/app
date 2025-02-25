<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalCampaignDeposit } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Campaign Deposit'
	};
</script>

<Template >
	{#snippet children({ args })}
		<args.modal {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ modal: ModalCampaignDeposit }} />
