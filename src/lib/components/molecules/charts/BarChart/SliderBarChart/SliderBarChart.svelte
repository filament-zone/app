<script lang="ts">
	import { onMount } from 'svelte';
	import type { Chart, ScriptableContext } from 'chart.js';
	import { AbstractBarChart, Input } from '$lib/components';
	import {
		type IAbstractBarChartProps,
		EInputSizeVariant,
		type ISliderBarChartProps,
		type ChartInstance
	} from '$lib/types';

	export let className: string = '';
	export let data: ISliderBarChartProps['data'];
	export let onChange: ISliderBarChartProps['onChange'];
	export let minLabel: ISliderBarChartProps['minLabel'] = 'Min';
	export let maxLabel: ISliderBarChartProps['maxLabel'] = 'Max';
	export let displayOnlySlider: ISliderBarChartProps['displayOnlySlider'] = false;

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'];
	let chartInstance: IAbstractBarChartProps['chartInstance'];

	let draggingRight = false;
	let draggingLeft = false;

	$: dragging = draggingLeft || draggingRight;

	let rightSliderX: number;
	let leftSliderX: number;

	const sliderHeight = 10;
	const sliderWidth = 10;

	let rightSliderBarIndex: number = data.labels?.length ?? 0;
	let leftSliderBarIndex: number = 0;

	$: {
		if (!dragging && chartInstance) {
			const rightSliderDataPoint = chartInstance.getDatasetMeta(0).data[rightSliderBarIndex - 1];
			rightSliderX =
				rightSliderDataPoint?.x !== undefined
					? rightSliderDataPoint.x + sliderWidth * 2
					: rightSliderX;
			chartInstance.update();
		}
		if (!dragging && chartInstance) {
			if (leftSliderBarIndex === -1 || leftSliderBarIndex === 0) {
				leftSliderX = 25;
			} else {
				const leftSliderDataPoint = chartInstance.getDatasetMeta(0).data[leftSliderBarIndex - 1];
				leftSliderX =
					leftSliderDataPoint?.x !== undefined
						? leftSliderDataPoint.x + sliderWidth * 2
						: leftSliderX;
			}
			chartInstance.update();
		}
	}
	$: chartOptions = {
		scales: {
			y: {
				display: false
			},
			x: {
				grid: {
					display: false
				}
			}
		},
		layout: {
			padding: {
				left: 15,
				right: 15
			}
		},

		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false
			}
		}
	};

	$: sliderPlugin = {
		id: 'sliderPlugin',
		afterDraw(chart: Chart) {
			const ctx = chart.ctx;
			const chartArea = chart.chartArea;
			const sliderY = chartArea.bottom;

			ctx.save();

			// Set styles for the slider
			ctx.fillStyle = '#21FFFE';
			ctx.strokeStyle = '#21FFFE';
			ctx.lineWidth = 4;

			// Draw the slider line
			ctx.beginPath();
			ctx.moveTo(leftSliderX - sliderWidth * 2, sliderY);
			ctx.lineTo(rightSliderX, sliderY);
			ctx.stroke();

			// Draw the left slider handle
			ctx.beginPath();
			ctx.fillRect(
				leftSliderX - sliderWidth * 2,
				sliderY - sliderHeight / 2,
				sliderWidth,
				sliderHeight
			);

			// Draw the right slider handle
			ctx.beginPath();
			ctx.fillRect(
				rightSliderX - sliderWidth * 1.5,
				sliderY - sliderHeight / 2,
				sliderWidth,
				sliderHeight
			);

			ctx.strokeStyle = '#DCDCDC';
			ctx.fillStyle = '#DCDCDC';

			ctx.beginPath();
			ctx.moveTo(0, sliderY);
			ctx.lineTo(leftSliderX - sliderWidth * 2, sliderY);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(rightSliderX - sliderWidth, sliderY);
			ctx.lineTo(chart.width, sliderY);
			ctx.stroke();

			ctx.restore();
		}
	};

	$: getBarIndexForSliderPosition = (x: number): number => {
		const scale = chartInstance.scales.x;
		const stepWidth = scale.width / scale.ticks.length;
		let index = Math.floor((x - scale.left) / stepWidth);
		index = Math.max(0, Math.min(index, chartData.labels?.length ?? 1 - 1));
		return index;
	};

	function isLeftSlider(x: number) {
		return x >= leftSliderX - sliderWidth - 20 && x <= leftSliderX;
	}

	function isRightSlider(x: number) {
		return x >= rightSliderX - sliderWidth - 20 && x <= rightSliderX;
	}

	function updateSliderPosition(event: MouseEvent) {
		const rect = chartCanvasInstance.getBoundingClientRect();
		const x = event.clientX - rect.left;

		chartCanvasInstance.style.cursor =
			isRightSlider(x) || isLeftSlider(x) ? 'ew-resize' : 'default';

		if (draggingRight) {
			rightSliderX = Math.min(Math.max(x, leftSliderX), chartInstance.chartArea.right);
			rightSliderBarIndex = getBarIndexForSliderPosition(rightSliderX);
			chartInstance.update();
		} else if (draggingLeft) {
			leftSliderX = Math.max(Math.min(x, rightSliderX), chartInstance.chartArea.left);

			leftSliderBarIndex = getBarIndexForSliderPosition(leftSliderX);
			chartInstance.update();
		}
	}

	onMount(() => {
		rightSliderX = chartInstance.chartArea.right;
		leftSliderX = chartInstance.chartArea.left;

		chartCanvasInstance.addEventListener('mousemove', (event) => {
			updateSliderPosition(event);
		});

		chartCanvasInstance.addEventListener('mousedown', (event) => {
			if (isLeftSlider(event.offsetX)) {
				draggingLeft = true;
			} else if (isRightSlider(event.offsetX)) {
				draggingRight = true;
			}
		});

		window.addEventListener('mouseup', () => {
			draggingRight = false;
			draggingLeft = false;
		});
	});

	$: maxValue = rightSliderBarIndex.toString();
	$: minValue = (leftSliderBarIndex + 1).toString();

	$: {
		if (onChange) {
			onChange(minValue, maxValue);
		}
	}

	const handleMin = (e: Event) => {
		leftSliderBarIndex = +(e.target as HTMLInputElement)?.value - 1;
	};

	const handleMax = (e: Event) => {
		rightSliderBarIndex = +(e.target as HTMLInputElement)?.value;
	};

	const chartData: ChartInstance['data'] = {
		labels: data.labels,
		datasets: [
			{
				label: '',
				data: data.datasets[0].data,

				borderColor: (context: ScriptableContext<'bar'>) => {
					const index = context.dataIndex;

					return index >= rightSliderBarIndex || index < leftSliderBarIndex ? '#C8C8C8' : '#21FFFE';
				},
				backgroundColor: (context: ScriptableContext<'bar'>) => {
					const index = context.dataIndex;

					return index >= rightSliderBarIndex || index < leftSliderBarIndex ? '#272727' : '#152827';
				},
				borderWidth: 1.5,
				barPercentage: 0.5,
				hidden: displayOnlySlider
			}
		]
	};
</script>

<div class="flex flex-row items-end gap-6 {displayOnlySlider ? 'h-[80px]' : ''}">
	<Input
		label={minLabel}
		sizeVariant={EInputSizeVariant.SMALL}
		placeholder="min"
		value={minValue}
		onInput={handleMin}
		min="0"
		type="number"
		max={maxValue}
		classNames="mb-4"
	/>
	<AbstractBarChart
		bind:chartInstance
		bind:chartCanvasInstance
		{chartData}
		{chartOptions}
		{className}
		plugins={[sliderPlugin]}
		styles={`height: 200px;`}
	/>

	<Input
		label={maxLabel}
		sizeVariant={EInputSizeVariant.SMALL}
		placeholder="max"
		type="number"
		onInput={handleMax}
		value={maxValue}
		min={(leftSliderBarIndex + 1).toString()}
		max={data.datasets.length.toString()}
		classNames="mb-4"
	/>
</div>
