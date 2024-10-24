<script lang="ts">
	import { ListItem } from '$lib/components';
	import { type IListProps } from '$lib/types';

	export let options: IListProps['options'] = [];
</script>

<div class="{$$props.class} list-container">
	{#if options?.length}
		{#each options as option}
			<ListItem
				{option}
				on:click={() => {
					if ($$props.onClick) {
						$$props.onClick(option);
					}
					if (option?.onClick) {
						option?.onClick();
					}
				}}
			/>
		{/each}
	{/if}
</div>

<style lang="less">
	.list-container {
		width: 100%;
		min-width: 200px;
		background-color: black;
		box-shadow: 0 0 0 0.5px #242424;
		left: 0;
		top: 34px;
		z-index: 1000;
	}
</style>
