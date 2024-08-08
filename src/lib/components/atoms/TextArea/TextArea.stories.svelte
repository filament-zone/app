<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { TextArea } from '$lib/components';

	export const meta = {
		title: 'Atoms/TextArea',
		component: TextArea
	};
</script>

<Template let:args>
	<TextArea {...args} />
</Template>

<Story name="Primary" args={{ placeholder: 'Placeholder' }} />
