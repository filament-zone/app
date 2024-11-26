<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/components';
	import { EButtonStyleVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Atoms/Button',
		component: Button,
		argTypes: {
			styleVariant: {
				options: Object.values(EButtonStyleVariant),
				control: {
					type: 'select'
				}
			},
			sizeVariant: {
				options: Object.values(EButtonSizeVariant),
				control: {
					type: 'select'
				}
			},
			Icon: {
				control: false
			},
			LeftContent: {
				control: false
			}
		}
	};
</script>

<Template let:args>
	<Button {...args}>Button</Button>
</Template>

<Story
	name="Primary"
	args={{ styleVariant: EButtonStyleVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Secondary"
	args={{ styleVariant: EButtonStyleVariant.SECONDARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Positive"
	args={{ styleVariant: EButtonStyleVariant.POSITIVE, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Negative"
	args={{ styleVariant: EButtonStyleVariant.NEGATIVE, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Highlight"
	args={{ styleVariant: EButtonStyleVariant.HIGHLIGHT, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Disabled"
	args={{
		sizeVariant: EButtonSizeVariant.PRIMARY,
		disabled: true
	}}
/>
