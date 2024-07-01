<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Typography from './Typography.svelte';

	export const meta = {
		title: 'Typography',
		component: Typography,
		argTypes: {
			variant: {
				control: false
			},
			styles: {
				control: false
			},
			className: {
				control: false
			}
		}
	};
</script>

<Template let:args>
	<div>
		<Typography variant="h1" {...args}>Heading 1</Typography>
		<Typography variant="h2" {...args}>Heading 2</Typography>
		<Typography variant="h3" {...args}>Heading 3</Typography>
		<Typography variant="h4" {...args}>Heading 4</Typography>
		<Typography variant="h5" {...args}>Heading 5</Typography>
		<Typography variant="h6" {...args}>Heading 6</Typography>
		<Typography variant="subtitle1" {...args}>Subtitle 1</Typography>
		<Typography variant="subtitle2" {...args}>Subtitle 2</Typography>
		<Typography variant="body1" {...args}>Body 1</Typography>
		<Typography variant="body2" {...args}>Body 2</Typography>
		<Typography variant="caption" {...args}>Caption</Typography>
		<br />
		<Typography variant="overline" {...args}>Overline</Typography>
	</div>
</Template>

<Story name="All Variants" />
