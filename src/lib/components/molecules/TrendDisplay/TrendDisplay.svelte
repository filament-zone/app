<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ITrendDisplayProps } from '$lib/types';

	export let value: ITrendDisplayProps['value'];
	export let change: ITrendDisplayProps['change'];
	export let period: ITrendDisplayProps['period'];
	export let direction: ITrendDisplayProps['direction'];

	const color = direction === 'up' ? 'var(--upOnly)' : 'var(--rugged)';
</script>

<div class="flex flex-row flex-wrap gap-2 items-center justify-between">
	<Typography variant="body2" class="text-nowrap">{value}</Typography>
	<Typography variant="badge" {color} class="text-nowrap">
		{change}
		{period}
	</Typography>
</div>
