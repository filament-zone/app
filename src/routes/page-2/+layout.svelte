<script lang="ts">
	import { SubPageMenuBar, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
</script>

<div>
	<Typography>PAGE 2</Typography>
	<SubPageMenuBar subPages={routes.PAGE_2} />
	<div class="pt-4">
		<slot />
	</div>
</div>
