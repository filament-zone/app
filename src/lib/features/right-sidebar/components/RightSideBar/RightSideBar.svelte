<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { rightSideBarStore } from '$lib/features';
	import type { IRightSideBarProps } from '$lib/types';
	import Arrow1Icon from '$lib/assets/icons/arrow-right.svg?component';

	export let closeOnClickOutside: IRightSideBarProps['closeOnClickOutside'] = false;
	export let classNames: IRightSideBarProps['classNames'] = '';

	const { closeRightSideBar } = rightSideBarStore;

	const handleClickOutside = () => {
		if (closeOnClickOutside) {
			closeRightSideBar();
		}
	};
</script>

<div class="w-[384px] h-full">
	<div
		class="right-sidebar px-6 py-8 {classNames} h-full"
		use:clickOutside
		on:clickOutside={handleClickOutside}
	>
		<div class="flex flex-col gap-8 h-full">
			<div class="close-button" on:click={closeRightSideBar} aria-hidden="true">
				<span>Close</span>
				<div class="icon">
					<Arrow1Icon />
				</div>
			</div>
			<div class="h-full">
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="less">
	.right-sidebar {
		border-radius: 4px;
		background: #141414;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		overflow: scroll;
	}

	.right-sidebar::-webkit-scrollbar {
		display: none;
	}

	.close-button {
		display: flex;
		width: fit-content;
		gap: 0.875rem;
		flex-direction: row;

		background: #202020;
		border-radius: 2px;
		padding: 4px 10px;
		color: #fff;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 16px;
		cursor: pointer;
		align-items: center;

		.icon {
			display: flex;
			justify-content: center;
			align-content: center;
			padding: 4px 6px;
			background: #1a1a1a;
			border-radius: 4px;
		}
	}
</style>
