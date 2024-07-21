import type { ScreenConfigT } from '$lib/components/molecules/charts/BarChart/PrimaryBarChart/PrimaryBarChart.svelte';

export const chartStylesConfig: Record<string, ScreenConfigT> = {
	xs: {
		chartHeight: 315,
		max: 12,
		x: {
			fontSize: 20
		},
		x2: {
			fontSize: 20
		}
	},
	sm: {
		chartHeight: 380,
		max: 14,
		x: {
			fontSize: 22
		},
		x2: {
			fontSize: 22
		}
	},
	md: {
		chartHeight: 450,
		max: 16,
		x: {
			fontSize: 28
		},
		x2: {
			fontSize: 28
		}
	},
	lg: {
		chartHeight: 520,
		max: 18,
		x: {
			fontSize: 36
		},
		x2: {
			fontSize: 36
		}
	},
	xl: {
		chartHeight: 600,
		max: 20,
		x: {
			fontSize: 43
		},
		x2: {
			fontSize: 43
		}
	},
	'2xl': {
		chartHeight: 680,
		max: 22,
		x: {
			fontSize: 43
		},
		x2: {
			fontSize: 43
		}
	}
};
