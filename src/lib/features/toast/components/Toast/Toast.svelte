<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { fly } from 'svelte/transition';
	import { type IToastProps } from '$lib/types';

	interface Props {
		data: IToastProps['config'];
		[key: string]: any
	}

	let { ...props }: Props = $props();
</script>

<div
	{...props}
	class="toast"
	in:fly={{ y: -50, duration: 200 }}
	out:fly={{ y: -100, duration: 200 }}
	onclick={bubble('click')}
	aria-hidden="true"
>
	{props.data?.message}
</div>

<style>
	.toast {
		width: 350px;
		margin-bottom: 10px;
		padding: 10px 20px;
		background-color: #333;
		color: white;
		border-radius: 2px;
		border: 0.5px solid var(--default-border);
		transition: transform 0.3s ease-in-out;
		font-family: var(--primary-font);
	}
</style>
