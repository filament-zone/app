<script lang="ts">
	export let label: string;
	export let variant: string = 'primary';
</script>

<div class="base-container variant-{variant} gap-6 w-full">
	{#if label}
		<div class="flex flex-row justify-between w-full">
			<div class="label-box">
				<span>{label}</span>
			</div>
			<div>
				<slot name="header" />
			</div>
		</div>
	{/if}
	<div class="w-full">
		<slot name="above-container" />
		<div class="slot-container">
			<slot />
		</div>
	</div>
</div>

<style lang="less">
	.base-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		height: fit-content;
		padding: 20px;
		background-color: var(--background-200);
		border: 0.5px solid var(--default-border);
		border-radius: 4px;

		.label-box {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 10px;
			background-color: var(--background-300);
			padding: 8px 0.875rem;
			border-radius: 4px;
			border: 0.5px solid var(--default-border);
			span {
				color: #fff;
				font-family: 'ff-meta-serif-web-pro', serif;
				font-size: 16px;
				font-style: normal;
				font-weight: 400;
				line-height: 1.25rem;
				letter-spacing: 0.04em;
			}
		}

		.slot-container {
			width: 100%;
			background-color: var(--background-300);
			padding: 16px;
			border-radius: 4px;
			border: 0.5px solid var(--default-border);
		}

		&.variant-secondary {
			background-color: transparent;

			.slot-container {
				padding: 0;
				background-color: transparent;
				border: none;
			}

			.label-box {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				gap: 10px;
				background-color: var(--background-300);
				padding: 8px 0.875rem;
				border-radius: 4px;
				border: 0.5px solid var(--default-border);
				span {
					color: #fff;
					font-family: 'ff-meta-serif-web-pro', serif;
					font-size: 16px;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25rem;
					letter-spacing: 0.04em;
				}
			}
		}

		&.variant-inner-container {
			padding: 20px;
			background-color: var(--background-100);

			.slot-container {
				border: none;
			}
			.label-box {
				padding: 6px 0.75rem;
				border: none;
				span {
					color: #fff;
					font-family: 'ff-meta-serif-web-pro', serif;
					font-size: 20px;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25rem;
					letter-spacing: 0.04em;
				}
			}
		}
	}
</style>
