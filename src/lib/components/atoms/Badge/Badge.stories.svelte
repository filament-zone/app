<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Badge } from '$lib/components';
	import { EBadgeColorVariant } from '$lib/types';

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
		colorVariant: EBadgeColorVariant.PRIMARY
	}}
/>
<Story
	name="Secondary"
	args={{ label: 'Badge Label', colorVariant: EBadgeColorVariant.SECONDARY }}
/>
<Story
	name="Success"
	args={{
		label: 'Success',
		colorVariant: EBadgeColorVariant.SUCCESS
	}}
/>
<Story
	name="In Progress"
	args={{ label: 'In Progress', colorVariant: EBadgeColorVariant.IN_PROGRESS }}
/>
<Story name="Rejected" args={{ label: 'Rejected', colorVariant: EBadgeColorVariant.REJECTED }} />
<Story name="Failed" args={{ label: 'Failed', colorVariant: EBadgeColorVariant.FAILED }} />
