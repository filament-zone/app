<script lang="ts">
	import { getContext } from 'svelte';
	import type { IStepBarStore } from '$lib/types';
	import CheckIcon from '$lib/assets/icons/check-1.svg?component';

	export let step;

	const { setCurrentStep } = getContext<IStepBarStore>('stepBarStore');
</script>

{#if step.description}
	<div>
		<button
			on:click={setCurrentStep.bind(null, step.value)}
			class:isCompleted={step.isCompleted}
			class:isActive={step.isActive}
		>
			<span>{step.description}</span>
			<div class="box">
				{#if step.isCompleted}
					<CheckIcon />
				{:else}
					{step.label}{/if}
			</div>
		</button>
	</div>
{/if}

<style lang="less">
	button {
		display: flex;
		flex-direction: row;
		gap: 8px;
		height: 28px;
		width: fit-content;
		padding: 4px 10px;
		justify-content: center;
		align-items: center;
		background-color: #181818;
		border-radius: 2px;

		&.isActive {
			background-color: #0d1e1d;

			span {
				color: #21fffe;
			}

			.box {
				background-color: #0c1919;
				color: #ffffff;
			}
		}

		&.isCompleted {
			background-color: #0d2f1d;

			span {
				color: #21f879;
			}

			.box {
				background-color: #0c2719;
				color: #c3cdc9;
			}
		}

		span {
			color: #a8a8a8;
			font-family: 'ff-meta-serif-web-pro', serif;
			font-size: 14px;
			font-style: normal;
			font-weight: 300;
			line-height: 14px;
			text-wrap: nowrap;
		}

		.box {
			background-color: #111111;
			width: 16px;
			height: 16px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 4px;
			padding: 2px;

			color: #a8a8a8;
			font-family: 'ff-meta-serif-web-pro', serif;
			font-size: 0.875rem;
			font-style: normal;
			font-weight: 300;
			line-height: 0.875rem;
		}
	}
</style>
