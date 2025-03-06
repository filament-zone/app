<script lang="ts">
	interface IDotsProps {
		color?: string;
	}

	let { color = 'grey' }: IDotsProps = $props();
</script>

<div class="dots">
	<div class="dot dot-1" style="background-color:{color}"></div>
	<div class="dot dot-2" style="background-color:{color}"></div>
</div>

<style lang="less">
	.dots {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;

		.dot {
			width: 3px;
			height: 3px;
			border-radius: 50%;
		}
	}
</style>
