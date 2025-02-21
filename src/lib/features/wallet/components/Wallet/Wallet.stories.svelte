<script module>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Wallet from './Wallet.svelte';

	export const meta = {
		title: 'Features/Wallet/Wallet',
		component: Wallet
	};
</script>

<Template >
	{#snippet children({ args })}
		<div class="flex justify-center items-center">
			<Wallet {...args} />
		</div>
	{/snippet}
</Template>

<Story name="Primary" />
