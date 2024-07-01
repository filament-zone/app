<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalConfirmation, ModalConnectWallet } from '$lib/features';
	export const meta = {
		title: 'Modal'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Confirmation Modal" args={{ modal: ModalConfirmation }} />
<Story name=" Connect Wallet Modal" args={{ modal: ModalConnectWallet }} />
