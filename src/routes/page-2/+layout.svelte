<script lang="ts">
	import { SubPageMenuBar, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
</script>

<div>
	<Typography>PAGE 2</Typography>
	<SubPageMenuBar subPages={routes.PAGE_2} />
	<slot />
</div>
