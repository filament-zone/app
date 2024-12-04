<script lang="ts">
	import { Badge, Button, Container, PrimaryDoughnutChart } from '$lib/components';
	import { EButtonSizeVariant } from '$lib/types';

	export let data;
</script>

<div class="flex flex-col xl:flex-row gap-4">
	<div class="w-full">
		<Container label="Campaign Preview">
			<span class="campaign-label">{data.campaign.title}</span>
		</Container>
	</div>
	<div class="flex flex-col min-w-[384px] gap-4">
		<Container label="Voting">
			<div class="flex flex-col gap-4">
				<Badge label="Turnout: 48%" />
				<PrimaryDoughnutChart
					chartData={data.chartData}
					centerText={['Text', '2.43B']}
					class="w-full"
				/>
				<Button sizeVariant={EButtonSizeVariant.FULL_WIDTH}>Vote</Button>
			</div>
		</Container>
		<Container label="Ticker">
			<span class="campaign-label">Ticker Content</span>
		</Container>
	</div>
</div>

<style lang="less">
	.campaign-label {
		color: var(--primary-white);
		font-family: var(--primary-font);
		font-size: 20px;
		font-style: normal;
		font-weight: 450;
		line-height: 20px;
	}
</style>
