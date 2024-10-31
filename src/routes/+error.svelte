<script>
	export let error;

	const status = error?.status || 500;
	const message = error?.message || 'An unexpected error occurred';
</script>

<div class="flex w-full h-full flex-col items-center justify-center">
	{#if status === 404}
		<h1>Page Not Found</h1>
		<p>The page you are looking for does not exist.</p>
		<a href="/">Go back to the homepage</a>
	{:else}
		<h1>Something went wrong</h1>
		<p>{message}</p>
	{/if}
</div>
