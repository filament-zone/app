<script>
	import { Toast, toastsStore } from '$lib/features';

	const { toasts } = toastsStore;
</script>

<div class="toast-container">
	{#each $toasts as toast (toast.id)}
		<Toast data={toast} />
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		z-index: 1000;
	}
</style>
