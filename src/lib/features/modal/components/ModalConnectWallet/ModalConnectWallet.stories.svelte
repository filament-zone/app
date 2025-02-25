<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalConnectWallet } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Connect Wallet'
	};
</script>

<Template >
	{#snippet children({ args })}
		<args.modal {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ modal: ModalConnectWallet }} />
