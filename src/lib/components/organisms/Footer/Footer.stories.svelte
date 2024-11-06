<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Footer } from '$lib/components';
	import { EButtonVariant, EButtonSizeVariant } from '$lib/types';

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
	args={{ colorVariant: EButtonVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
