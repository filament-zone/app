<script lang="ts">
	import { Typography } from '$lib/components';
	import { type ILabelProps } from '$lib/types';

	export let value: ILabelProps['value'] = '';
</script>

<div class="label">
	<Typography variant="overline">{value}</Typography>
</div>

<style lang="less">
	.label {
		margin-bottom: 0.4rem;
		width: fit-content;
		opacity: 0.8;
	}
</style>
