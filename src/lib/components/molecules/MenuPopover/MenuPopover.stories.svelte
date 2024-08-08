<script context="module" lang="ts">
	import { Template, Story } from '@storybook/addon-svelte-csf';
	import { List, MenuPopover } from '$lib/components';
	import MoreHorizontalIcon from '$lib/assets/icons/more-horizontal.svg?component';

	export const meta = {
		title: 'Molecules/MenuPopover',
		component: MenuPopover
	};

	const data = {
		options: [
			{ value: 'stake', label: 'Stake' },
			{ value: 'redelegate', label: 'Redelegate' },
			{ value: 'unstake', label: 'Unstake', disabled: true },
			{ value: 'claimRewards', label: 'Claim Rewards', disabled: true }
		]
	};
</script>

<Template let:args>
	<MenuPopover>
		<div slot="trigger" class="cursor-pointer">
			<MoreHorizontalIcon />
		</div>
		<List slot="content" options={args.options} />
	</MenuPopover>
</Template>

<Story name="Primary" args={data} />
