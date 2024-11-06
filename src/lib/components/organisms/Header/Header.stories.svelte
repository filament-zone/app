<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Header } from '$lib/components';
	import { EButtonVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Organisms/Header',
		component: Header
	};
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story
	name="Header Base"
	args={{ colorVariant: EButtonVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
