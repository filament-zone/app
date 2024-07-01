<script lang="ts">
	import { modalStore } from '$lib/features';
	import { clickOutside } from '$lib/actions';
	import type { IModalProps } from '$lib/types';

	export let closeOnClickOutside: IModalProps['closeOnClickOutside'] = true;
	export let onClickOutside: IModalProps['onClickOutside'] = () => {};
	export let classNames: IModalProps['classNames'] = '';
	export let width: IModalProps['width'] = '';

	const { closeModal } = modalStore;

	$: handleClickOutside = () => {
		if (onClickOutside) {
			onClickOutside();
		}
		if (closeOnClickOutside) {
			closeModal();
		}
	};
</script>

<div class="overlay">
	<div
		class="modal-container {classNames}"
		use:clickOutside
		on:clickOutside={handleClickOutside}
		style={`width: ${width}`}
	>
		<div class="w-full"><slot name="header" /></div>
		<div class="w-full"><slot name="content" /></div>
		{#if $$slots.footer}
			<div class="w-full"><slot name="footer" /></div>
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

		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(5px);
	}

	.modal-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #131313;

		min-width: 375px;
		min-height: 200px;
		padding: 20px;
		gap: 20px;

		max-height: 90vh;
		overflow: scroll;

		@media @size_md {
			min-width: 475px;
		}

		@media @size_lg {
			min-width: 600px;
		}

		@media @size_2xl {
			min-width: 800px;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
