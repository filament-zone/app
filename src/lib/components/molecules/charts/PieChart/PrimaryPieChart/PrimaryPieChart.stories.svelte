<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PrimaryPieChart } from '$lib/components';

	export const meta = {
		title: 'Molecules/Charts/PieChart',
		component: PrimaryPieChart
	};
</script>

<Template let:args>
	<div class="flex w-full h-full justify-center align-middle">
		<div class="w-[600px]">
			<PrimaryPieChart {...args} />
		</div>
	</div>
</Template>

<Story
	name="Primary"
	args={{
		data: [
			{ label: 'empty', value: 40 },
			{ label: 'conversions', value: 60 }
		]
	}}
/>
