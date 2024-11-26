<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Footer } from '$lib/components';
	import { EButtonStyleVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Organisms/Footer',
		component: Footer
	};
</script>

<Template let:args>
	<Footer {...args} />
</Template>

<Story
	name="Footer Base"
	args={{ colorVariant: EButtonStyleVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
