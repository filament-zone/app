<script lang="ts">
	import moment from 'moment';
	import { type ITickerProps } from '$lib/types';

	let { name, date, status }: ITickerProps = $props();
</script>

<div class="ticker-item">
	<div class="ticker-item__name">{name}</div>
	<div class="ticker-item__date">{moment(date).format('MMM DD, YYYY')}</div>
	<div class="ticker-item__status">
		<span style={`color: ${status?.toLocaleLowerCase() === 'approved' ? '#00F58C' : '#FF679B'}`}>
			{status}</span
		>
	</div>
</div>

<style lang="less">
	.ticker-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		border-radius: 4px;
		border: 0.5px solid var(--default-border);
		background: var(--highlight-bg, #1b1b1b);
		padding: 4px 8px;
		position: relative;
		max-width: 450px;

		.ticker-item__name {
			color: #fffef6;
			font-family: var(--secondary-font);
			font-size: 12px;
			font-style: normal;
			font-weight: 500;
			line-height: 12px;
		}

		.ticker-item__date {
			color: var(--primary-white);
			font-family: var(--primary-font);
			font-size: 13px;
			font-style: normal;
			font-weight: 450;
			line-height: 12px;
			letter-spacing: 0.65px;
			opacity: 0.5;

			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.ticker-item__status {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 6px 8px;
			border-radius: 4px;
			background: var(--darkNet);
			width: 70px;
			height: 24px;

			span {
				font-family: var(--primary-font);
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
</style>
