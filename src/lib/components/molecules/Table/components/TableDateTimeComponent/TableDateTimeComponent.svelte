<script lang="ts">
	import moment from 'moment/moment.js';
	import { Typography } from '$lib/components';

	import { type ITableDateTimeComponentProps } from '$lib/types';

	export let date: ITableDateTimeComponentProps['date'];
</script>

<div class="flex flex-row items-center gap-2">
	<Typography variant="caption">{moment(date).format('MMM DD YYYY')}</Typography>
	<Typography variant="caption" color="var(--gray-200)">{moment(date).format('HH:MM')}</Typography>
</div>
