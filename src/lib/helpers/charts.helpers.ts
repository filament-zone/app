import type { ILineChartWithControlsProps } from '$lib/components/organisms/charts/LineChartWithControls/LineChartWithControls.svelte';
import { EChartDateRange } from '$lib/components/molecules/charts/charts.types';
import type { ChartDatasetProperties } from 'chart.js';

export const updateChartDateRange: (
	chartData: ILineChartWithControlsProps['data'],
	toggleValue: EChartDateRange
) => ILineChartWithControlsProps['data'] = (chartData, toggleValue) => {
	if (!chartData || !chartData.labels || !chartData.datasets || !chartData.datasets[0].data) {
		return chartData;
	}

	const currentDate = new Date(chartData.labels[chartData.labels.length - 1]);
	let startDate;

	switch (toggleValue) {
		case EChartDateRange['1d']:
			startDate = new Date(currentDate);
			startDate.setDate(startDate.getDate() - 1);
			break;
		case EChartDateRange['1w']:
			startDate = new Date(currentDate);
			startDate.setDate(startDate.getDate() - 7);
			break;
		case EChartDateRange['1m']:
			startDate = new Date(currentDate);
			startDate.setMonth(startDate.getMonth() - 1);
			break;
		case EChartDateRange['3m']:
			startDate = new Date(currentDate);
			startDate.setMonth(startDate.getMonth() - 3);
			break;
		case EChartDateRange['6m']:
			startDate = new Date(currentDate);
			startDate.setMonth(startDate.getMonth() - 6);
			break;
		case EChartDateRange['1y']:
			startDate = new Date(currentDate);
			startDate.setFullYear(startDate.getFullYear() - 1);
			break;
		case EChartDateRange['5y']:
			startDate = new Date(currentDate);
			startDate.setFullYear(startDate.getFullYear() - 5);
			break;
		case EChartDateRange['all']:
		default:
			startDate = new Date(chartData.labels[0]);
			break;
	}
	const filteredLabels = [];
	const filteredData: ChartDatasetProperties<'line', number | number[]>['data'][] = [];

	for (let i = 0; i < chartData.labels.length; i++) {
		const labelDate = new Date(chartData.labels[i]);
		if (labelDate >= startDate) {
			filteredLabels.push(chartData.labels[i]);
			filteredData.push(chartData.datasets[0].data[i]);
		}
	}

	return {
		...chartData,
		labels: filteredLabels,
		datasets: chartData.datasets.map((dataset) => ({
			...dataset,
			data: filteredData
		}))
	};
};
