<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/components';
	import { EButtonColorVariant, EButtonSizeVariant } from '$lib/types';

	export const meta = {
		title: 'Atoms/Button',
		component: Button,
		argTypes: {
			colorVariant: {
				options: Object.values(EButtonColorVariant),
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
	args={{ colorVariant: EButtonColorVariant.PRIMARY, sizeVariant: EButtonSizeVariant.PRIMARY }}
/>
<Story
	name="Primary Full Width"
	args={{ colorVariant: EButtonColorVariant.PRIMARY, sizeVariant: EButtonSizeVariant.FULL_WIDTH }}
/>
