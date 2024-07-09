<script lang="ts">
	import { fly } from 'svelte/transition';
	import { type IToastProps } from '$lib/types';

	export let data: IToastProps['config'];
</script>

<div class="toast" in:fly={{ y: -50, duration: 200 }} out:fly={{ y: -100, duration: 200 }}>
	{data?.message}
</div>

<style>
	.toast {
		width: 350px;
		margin-bottom: 10px;
		padding: 10px 20px;
		background-color: #333;
		color: white;
		border-radius: 5px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-in-out;
	}
</style>
