export const formatLargeNumber = (value: number, prefix?: string): string => {
	const prefixString = prefix ?? '';
	if (value >= 1_000_000_000) {
		return `${prefixString}${(value / 1_000_000_000).toFixed(2)}B`;
	} else if (value >= 1_000_000) {
		return `${prefixString}${(value / 1_000_000).toFixed(2)}M`;
	} else if (value >= 1_000) {
		return `${prefixString}${(value / 1_000).toFixed(2)}K`;
	} else {
		return `${prefixString}${value.toFixed(2)}`;
	}
};
