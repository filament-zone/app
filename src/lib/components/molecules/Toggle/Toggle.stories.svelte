<!--<script module lang="ts">-->
<!--	import { Story, Template } from '@storybook/addon-svelte-csf';-->
<!--	import { Toggle } from '$lib/components';-->
<!--	import type { IToggleProps } from '$lib/components/molecules/Toggle/Toggle.svelte';-->
<!--	import { EToggleVariant } from '$lib/components/molecules/Toggle/Toggle.enums';-->

<!--	export const meta = {-->
<!--		title: 'Molecules/Toggle',-->
<!--		component: Toggle-->
<!--	};-->

<!--	const tableToggleValue: string[] = [];-->

<!--	let tableToggleOptions: IToggleProps<string>['options'] = [-->
<!--		{ value: 'views', label: 'Views' },-->
<!--		{ value: 'clicks', label: 'Clicks' },-->
<!--		{ value: 'conversions', label: 'Conversions' }-->
<!--	];-->
<!--</script>-->

<!--<Template>-->
<!--	{#snippet children({ args })}-->
<!--		<Toggle {...args} />-->
<!--	{/snippet}-->
<!--</Template>-->

<!--<Story name="Primary" args={{ options: tableToggleOptions, value: tableToggleValue }} />-->
<!--<Story-->
<!--	name="Primary Multi"-->
<!--	args={{ options: tableToggleOptions, value: tableToggleValue, isMulti: true }}-->
<!--/>-->
<!--<Story-->
<!--	name="Secondary"-->
<!--	args={{ options: tableToggleOptions, value: tableToggleValue, variant: EToggleVariant.SECONDARY }}-->
<!--/>-->
