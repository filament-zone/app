<script lang="ts">
	export let label: string;
</script>

<div class="base-container gap-6 w-full">
	<div class="flex flex-row justify-between w-full">
		{#if label}
			<div class="label-box">
				<span>{label}</span>
			</div>
		{/if}
		<div>
			<slot name="header" />
		</div>
	</div>
	<div class="slot-container">
		<slot />
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
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: 0.875rem;
			}
		}

		.slot-container {
			width: 100%;
			background-color: var(--background-300);
			padding: 16px;
			border-radius: 4px;
			border: 0.5px solid var(--default-border);
		}
	}
</style>
