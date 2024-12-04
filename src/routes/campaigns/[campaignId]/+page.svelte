<script lang="ts">
	import { Container } from '$lib/components';

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
			<span class="campaign-label">Voting Content</span>
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
