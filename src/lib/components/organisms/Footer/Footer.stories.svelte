<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Footer } from '$lib/components';
	import { EButtonStyleVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Organisms/Footer',
		component: Footer
	};
</script>

<Template >
	{#snippet children({ args })}
		<Footer {...args} />
	{/snippet}
</Template>

<Story
	name="Footer Base"
	args={{ colorVariant: EButtonStyleVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
