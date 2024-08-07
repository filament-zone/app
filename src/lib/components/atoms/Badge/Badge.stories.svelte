<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Badge } from '$lib/components';
	import { EBadgeColorVariant, EBadgeWidthVariant } from '$lib/types';

	export const meta = {
		title: 'Atoms/Badge',
		component: Badge
	};
</script>

<Template let:args>
	<Badge {...args} />
</Template>

<Story
	name="Primary"
	args={{
		label: 'Badge Label',
		colorVariant: EBadgeColorVariant.PRIMARY,
		widthVariant: EBadgeWidthVariant.FIT_CONTENT
	}}
/>
<Story
	name="Secondary"
	args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.SECONDARY }}
/>
<Story
	name="Success"
	args={{
		label: 'Badge Label',
		colorVariant: EBadgeColorVariant.SUCCESS,
		widthVariant: EBadgeWidthVariant.FIT_CONTENT
	}}
/>
<Story name="Danger" args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.DANGER }} />
<Story name="Warning" args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.WARNING }} />
<Story name="Info" args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.INFO }} />
<Story name="Light" args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.LIGHT }} />
