<script lang="ts">
	import { modalStore } from '$lib/features';
	import { clickOutside } from '$lib/actions';
	import type { IModalProps } from '$lib/types';

	let {
		closeOnClickOutside = true,
		onClickOutside = () => {},
		classNames = '',
		width = '',
		header,
		content,
		footer
	}: IModalProps = $props();

	const { closeModal } = modalStore;

	let handleClickOutside = $derived(() => {
		if (onClickOutside) {
			onClickOutside();
		}
		if (closeOnClickOutside) {
			closeModal();
		}
	});
</script>

<div class="overlay">
	<div
		class="modal-container {classNames}"
		use:clickOutside={[]}
		onclickOutside={handleClickOutside}
		style={`width: ${width}`}
	>
		<div class="header w-full">{@render header?.()}</div>
		<div class="w-full">{@render content?.({ class: 'content' })}</div>
		{#if footer}
			<div class="w-full">{@render footer?.()}</div>
		{/if}
	</div>
</div>

<style lang="less">
	@import '$lib/styles/layout.less';

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background: rgba(0, 0, 0, 0.699);
		backdrop-filter: blur(8px);
		z-index: 1000;
	}

	.modal-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--background);
		border-radius: 2px;

		min-width: 375px;
		max-width: 512px;

		max-height: 90vh;
		overflow: scroll;

		border: 1px solid var(--default-border);

		@media @size_md {
			min-width: 475px;
		}

		@media @size_lg {
			min-width: 512px;
		}

		&::-webkit-scrollbar {
			display: none;
		}

		& > div {
			padding: 16px;
			display: flex;
			height: 100%;
			flex-direction: column;
			justify-content: space-between;
		}

		.header {
			border-bottom: 1px solid var(--default-border);
			padding: 16px;
		}
	}
	:global(.modal-container .content) {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		min-height: 400px;
	}
</style>
