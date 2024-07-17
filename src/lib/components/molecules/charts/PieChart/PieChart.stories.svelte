<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PieChart } from '$lib/components';

	export const meta = {
		title: 'Molecules/Charts/PieChart',
		component: PieChart
	};
</script>

<Template let:args>
	<div class="flex w-full h-full justify-center align-middle">
		<div class="w-[600px]">
			<PieChart {...args} />
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
