<script lang="ts">
	export let label: string;
</script>

<div class="base-container gap-6 w-full">
	<div class="flex flex-row justify-between w-full">
		<div class="label-box">
			<span>{label}</span>
		</div>
		<div>
			<slot name="header" />
		</div>
	</div>
	<slot />
</div>

<style lang="less">
	.base-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 20px;
		background-color: var(--background-100);
		box-shadow: 0 0 0 1px #66666611;

		.label-box {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 10px;
			background-color: rgba(10, 11, 14, 0.7);
			padding: 8px 0.875rem;
			border-radius: 4px;
			span {
				color: #fff;
				font-family: 'ff-meta-serif-web-pro', serif;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: 0.875rem;
			}
		}
	}
</style>
