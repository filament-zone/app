<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ITrendDisplayProps } from '$lib/types';

	let { value, change, period, direction }: ITrendDisplayProps = $props();

	const color = direction === 'up' ? 'var(--upOnly)' : 'var(--rugged)';
</script>

<div class="flex flex-row flex-wrap gap-2 items-center justify-between">
	<Typography variant="body2" classNames="text-nowrap">{value}</Typography>
	<Typography variant="badge" {color} classNames="text-nowrap">
		{change}
		{period}
	</Typography>
</div>
