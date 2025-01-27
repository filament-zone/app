<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalTransactionTimeLine } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Transaction TimeLine'
	};
</script>

<Template let:args>
	<svelte:component this={args.modal} {...args} />
</Template>

<Story name="Primary" args={{ modal: ModalTransactionTimeLine }} />
