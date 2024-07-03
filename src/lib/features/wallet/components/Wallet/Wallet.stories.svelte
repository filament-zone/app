<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Wallet from './Wallet.svelte';

	export const meta = {
		title: 'Wallet',
		component: Wallet
	};
</script>

<Template let:args>
	<div class="flex justify-center items-center">
		<Wallet {...args} />
	</div>
</Template>

<Story name="Component" />
