<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ModalTransactionTimeLine } from '$lib/features';

	export const meta = {
		title: 'Features/Modal/Transaction TimeLine'
	};
</script>

<Template >
	{#snippet children({ args })}
		<args.modal {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ modal: ModalTransactionTimeLine }} />
