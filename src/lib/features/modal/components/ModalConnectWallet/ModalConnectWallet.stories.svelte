<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalConnectWallet } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Connect Wallet'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalConnectWallet }} />
