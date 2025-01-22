<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { delegatesColumnDefCommon } from '$lib/features';
	import { Table } from '$lib/components';
	import type { ITableProps } from '$lib/types';

	const data = derived(page, () => $page.data);

	$: activeDelegatesTable = {
		data: [...$data.delegates],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<Table {...activeDelegatesTable} />
