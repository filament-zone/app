<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Typography } from '$lib/components';
	import { type IToggleContentContainerProps } from '$lib/types';

	export let selected: IToggleContentContainerProps['selected'] = 'isFirst';

	const toggleContainerState = writable({
		isFirst: {
			selected: true
		},
		isSecond: {
			selected: false
		}
	});

	const toggleContainer = (value: IToggleContentContainerProps['selected']) => {
		toggleContainerState.update((state) => {
			state.isFirst.selected = value === 'isFirst';
			state.isSecond.selected = value === 'isSecond';
			return state;
		});
		selected = value;
	};

	onMount(() => {
		toggleContainer(selected);
	});
</script>

<div>
	<div
		on:click={toggleContainer.bind(null, 'isFirst')}
		aria-hidden="true"
		class:isActive={!$toggleContainerState.isFirst.selected}
		class="cursor-pointer"
	>
		<slot name="first"></slot>
	</div>
	<div class="divider">
		<Typography variant="subtitle2">or</Typography>
	</div>
	<div
		on:click={toggleContainer.bind(null, 'isSecond')}
		aria-hidden="true"
		class:isActive={!$toggleContainerState.isSecond.selected}
		class="cursor-pointer"
	>
		<slot name="second"></slot>
	</div>
</div>

<style lang="less">
	.isActive {
		opacity: 0.3;
	}

	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin: 20px 0;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #ffffff;
		margin: 0 10px;
	}
</style>
