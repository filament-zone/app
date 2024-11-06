<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/components';
	import { EButtonVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Atoms/Button',
		component: Button,
		argTypes: {
			styleVariant: {
				options: Object.values(EButtonVariant),
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
			LeftIcon: {
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
	args={{ styleVariant: EButtonVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Secondary"
	args={{ styleVariant: EButtonVariant.SECONDARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Positive"
	args={{ styleVariant: EButtonVariant.POSITIVE, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Negative"
	args={{ styleVariant: EButtonVariant.NEGATIVE, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Highlight"
	args={{ styleVariant: EButtonVariant.HIGHLIGHT, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Disabled"
	args={{
		sizeVariant: EButtonSizeVariant.PRIMARY,
		disabled: true
	}}
/>
