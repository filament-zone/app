<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalVerifyAccount } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Verify Account'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalVerifyAccount }} />
