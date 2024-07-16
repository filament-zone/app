<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import type { IPieChartProps } from '$lib/types';

	export let data: IPieChartProps['data'];
	export let colors: IPieChartProps['colors'];
	export let chartInstance: IPieChartProps['chartInstance'];

	Chart.register(...registerables);
	let pieChartElement: HTMLCanvasElement;

	const chartData = {
		labels: data?.map(({ label }) => label) ?? [],
		datasets: [
			{
				data: data?.map(({ value }) => value),
				backgroundColor: colors,
				borderRadius: 4,
				borderWidth: 2
			}
		]
	};

	onMount(() => {
		if (browser) {
			chartInstance = new Chart(pieChartElement, {
				type: 'pie',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: false
						}
					},
					responsive: true
				}
			});
		}
	});

	eventListener(
		'resize',
		throttle(() => {
			chartInstance?.resize();
		}, 500)
	);
</script>

<div class="chart-container relative w-full">
	<canvas bind:this={pieChartElement} />
</div>
