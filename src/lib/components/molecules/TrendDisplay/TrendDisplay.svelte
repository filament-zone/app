<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ITrendDisplayProps } from '$lib/types';

	export let value: ITrendDisplayProps['value'];
	export let change: ITrendDisplayProps['change'];
	export let period: ITrendDisplayProps['period'];
	export let direction: ITrendDisplayProps['direction'];
</script>

<div class="flex flex-row gap-2">
	<Typography variant="h6">{value}</Typography>
	<Typography
		variant="h6"
		color={`${direction === 'up' ? 'var(--upOnly)' : 'var(--rugged)'}`}
		class="text-nowrap"
	>
		{change}
		{period}
	</Typography>
</div>
