<script lang="ts">
	import { SecondaryLineChart, TrendDisplay, Toggle, Container } from '$lib/components';
	import { calculatePercentageChange, updateChartDateRange } from '$lib/helpers';
	import { defaultToggleOptions } from '$lib/constants';
	import {
		EChartDateRange,
		EToggleSizeVariant,
		type ILineChartWithControlsProps,
		type IToggleProps,
		type ITrendDisplayProps
	} from '$lib/types';

	let {
		chartData,
		label,
		toggleOptions = [],
		formatter,
		useLastValue = false,
		toggleValue = EChartDateRange['3m'],
		displayToggle = true
	}: ILineChartWithControlsProps = $props();

	let localOptions = $derived.by(() =>
		(toggleOptions.length ? [...toggleOptions] : [...defaultToggleOptions]).map((option) => ({
			value: option,
			label: option.toUpperCase()
		}))
	);

	let localToggleValue: IToggleProps<string>['value'] = $state(toggleValue);

	$effect(() => {
		localToggleValue = toggleValue;
	});

	let localChartData: ILineChartWithControlsProps['chartData'] = $derived.by(() =>
		updateChartDateRange(chartData, localToggleValue)
	);

	let totalValue = $derived(
		Number(localChartData?.datasets[0].data.reduce((a, b) => (a as number) + (b as number), 0))
	);

	let change = $derived(calculatePercentageChange(localChartData?.datasets[0].data as number[]));
	let endValue = $derived(localChartData?.datasets[0].data.at(-1) as number);
	let value = $derived(useLastValue ? endValue : totalValue);
	let trendDisplayData: ITrendDisplayProps = $derived({
		value: formatter ? Number(formatter(value)) : value,
		change: change > 0 ? `+${change}%` : `${change}%`,
		period: `(${localToggleValue})`,
		direction: change > 0 ? 'up' : 'down'
	});
	let lineColors = $derived(trendDisplayData.direction === 'up' ? ['#7dfa79'] : ['#ff74a4']);
	let backgroundColors = $derived(
		trendDisplayData.direction === 'up'
			? ['rgba(125, 250, 121, 0.1)']
			: ['rgba(255, 116, 164, 0.1)']
	);
</script>

<Container {label} classNames="w-full" variant="inner-container">
	{#snippet header()}
		<div class="flex flex-col md:flex-row justify-between">
			<TrendDisplay {...trendDisplayData} />
			{#if displayToggle}
				<Toggle
					bind:value={localToggleValue}
					options={localOptions}
					sizeVariant={EToggleSizeVariant.NORMAL}
				/>
			{/if}
		</div>
	{/snippet}

	<SecondaryLineChart data={localChartData} {lineColors} {backgroundColors} />
</Container>
