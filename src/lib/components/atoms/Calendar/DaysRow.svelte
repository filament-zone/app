<script lang="ts">
	import { Typography } from '$lib/components';

	const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
</script>

<div class="days-row">
	{#each daysOfWeek as dayName}
		<div class="day-item">
			<Typography variant="caption" color="white">{dayName}</Typography>
		</div>
	{/each}
</div>

<style>
	.days-row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}
	.day-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 45px;
	}
</style>
