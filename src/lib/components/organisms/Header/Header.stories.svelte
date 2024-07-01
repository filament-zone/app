<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Header } from '$lib/components';
	import { EButtonColorVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Header',
		component: Header
	};
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story
	name="Header Base Layout"
	args={{ colorVariant: EButtonColorVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
