<script lang="ts">
	import { type IStepBarCampaignButtonProps } from '$lib/types';

	export let step: IStepBarCampaignButtonProps['step'];
</script>

{#if step.description}
	<div>
		<button class:isCompleted={step.isCompleted} class:isActive={step.isActive}>
			<span>{step.description}</span>
			<div class="box">
				{#if step.isCompleted}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						class="check-icon"
					>
						<path
							fill-rule="evenodd"
							d="M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14zm-.222-3.944 4.148-4.667-1.628-1.447-3.21 3.612-1.291-1.937-1.814 1.208 2.074 3.111.783 1.174.938-.054z"
							clip-rule="evenodd"
							opacity=".8"
						/>
					</svg>
				{:else}
					{step.label}
				{/if}
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
			background-color: var(--darkNet-100);

			span {
				color: var(--purpleCow);
				font-weight: 600;
			}

			.box {
				font-weight: 600;
				background-color: unset;
				color: var(--purpleCow);
			}
		}

		&.isCompleted {
			background-color: var(--darkNet-100);

			span {
				color: var(--upOnly);
			}

			.box {
				background-color: unset;
				color: var(--upOnly);

				.check-icon {
					path {
						fill: var(--upOnly);
					}
				}
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
