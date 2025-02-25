<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Input } from '$lib/components';
	import { EInputSizeVariant } from '$lib/types';
	import CopyIcon from '$lib/assets/icons/copy.svg?component';

	export const meta = {
		title: 'Atoms/Input',
		component: Input,
		argTypes: {
			colorVariant: {
				control: false
			},
			sizeVariant: {
				options: Object.values(EInputSizeVariant),
				control: {
					type: 'select'
				}
			},
			Icon: {
				control: false
			},
			max: {
				control: false
			},
			min: {
				control: false
			},
			hideLeftBorder: {
				control: false
			},
			classNames: {
				control: false
			},
			LeftContent: {
				control: false
			},
			RightIcon: {
				control: false
			}
		}
	};
</script>

<Template >
	{#snippet children({ args })}
		<Input {...args} />
	{/snippet}
</Template>

<Story name="Small" args={{ placeholder: 'Placeholder', sizeVariant: EInputSizeVariant.SMALL }} />
<Story name="Medium" args={{ placeholder: 'Placeholder', sizeVariant: EInputSizeVariant.MEDIUM }} />
<Story
	name="Full width"
	args={{ placeholder: 'Placeholder', sizeVariant: EInputSizeVariant.FULL_WIDTH }}
/>
<Story
	name="Label"
	args={{ placeholder: 'Placeholder', sizeVariant: EInputSizeVariant.MEDIUM, label: 'Input Label' }}
/>
<Story
	name="Error"
	args={{
		placeholder: 'Placeholder',
		sizeVariant: EInputSizeVariant.MEDIUM,
		label: 'Input Label',
		error: 'Error text'
	}}
/>
<Story
	name="Disabled"
	args={{
		placeholder: 'Placeholder',
		sizeVariant: EInputSizeVariant.MEDIUM,
		label: 'Input Label',
		disabled: true
	}}
/>
<Story
	name="Left Icon"
	args={{
		placeholder: 'Placeholder',
		sizeVariant: EInputSizeVariant.MEDIUM,
		label: 'Input Label',
		LeftContent: CopyIcon
	}}
/>
