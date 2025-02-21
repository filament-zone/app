<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Header } from '$lib/components';
	import { EButtonStyleVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Organisms/Header',
		component: Header
	};
</script>

<Template >
	{#snippet children({ args })}
		<Header {...args} />
	{/snippet}
</Template>

<Story
	name="Header Base"
	args={{ colorVariant: EButtonStyleVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
