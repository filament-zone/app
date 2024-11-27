<script lang="ts">
	import { Card, SecondaryLineChart, TrendDisplay, Toggle } from '$lib/components';
	import { calculatePercentageChange, updateChartDateRange } from '$lib/helpers';
	import { defaultToggleOptions } from '$lib/constants';
	import {
		EChartDateRange,
		EToggleSizeVariant,
		type ILineChartWithControlsProps
	} from '$lib/types';

	export let chartData: ILineChartWithControlsProps['data'];
	export let label: ILineChartWithControlsProps['label'];
	export let toggleOptions: ILineChartWithControlsProps['toggleOptions'] = [];
	export let formatter: ILineChartWithControlsProps['formatter'];
	export let useLastValue: ILineChartWithControlsProps['useLastValue'] = false;
	export let toggleValue: ILineChartWithControlsProps['toggleValue']['value'] =
		EChartDateRange['3m'];
	export let displayToggle: ILineChartWithControlsProps['displayToggle'] = true;

	$: localOptions = (toggleOptions.length ? [...toggleOptions] : [...defaultToggleOptions]).map(
		(option) => ({ value: option, label: option.toUpperCase() })
	);

	let localChartData: ILineChartWithControlsProps['data'];
	let localToggleValue: ILineChartWithControlsProps['toggleValue']['value'];

	$: {
		localToggleValue = toggleValue;
	}

	$: {
		localChartData = updateChartDateRange(chartData, localToggleValue);
	}

	$: totalValue = Number(
		localChartData?.datasets[0].data.reduce((a, b) => (a as number) + (b as number), 0)
	);

	$: change = calculatePercentageChange(localChartData?.datasets[0].data as number[]);
	$: endValue = localChartData?.datasets[0].data.at(-1) as number;
	$: value = useLastValue ? endValue : totalValue;

	$: trendDisplayData = {
		value: formatter ? formatter(value) : value,
		change: change > 0 ? `+${change}%` : `${change}%`,
		period: `(${localToggleValue})`,
		direction: change > 0 ? 'up' : 'down'
	};

	$: lineColors = trendDisplayData.direction === 'up' ? ['#7dfa79'] : ['#ff74a4'];
	$: backgroundColors =
		trendDisplayData.direction === 'up'
			? ['rgba(125, 250, 121, 0.1)']
			: ['rgba(255, 116, 164, 0.1)'];
</script>

<Card {label}>
	<div class="flex flex-col md:flex-row justify-between">
		<TrendDisplay {...trendDisplayData} />
		{#if displayToggle}
			<Toggle
				options={localOptions}
				bind:value={localToggleValue}
				sizeVariant={EToggleSizeVariant.NORMAL}
			/>
		{/if}
	</div>
	<SecondaryLineChart data={localChartData} {lineColors} {backgroundColors} />
</Card>
