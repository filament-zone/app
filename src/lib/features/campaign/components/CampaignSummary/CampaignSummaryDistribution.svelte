<script lang="ts">
	import { SearchIcon } from 'svelte-feather-icons';
	import { Button, Container, Input, Table, Typography } from '$lib/components';
	import { distributionInsightsColumnDef, distributionAllocationColumnDef } from '$lib/features';
	import { EInputSizeVariant } from '$lib/types';
	import { shortCutTransactionHash } from '$lib/helpers/index.js';

	$: insightsTable = {
		data: [
			{
				recipients: '1,000',
				'top-1-percent': '10',
				'top-10-percent': '100',
				averageAllocation: 500
			}
		],
		columnDef: [...distributionInsightsColumnDef]
	};

	$: allocationTable = {
		data: [
			{
				number: '1',
				address: shortCutTransactionHash('0x01ed3152fc4c092faa6c16fa3afc9b8d0bdc2491'),
				percentage: '12%',
				totalAllocation: 213428103
			}
		],
		columnDef: [...distributionAllocationColumnDef]
	};
</script>

<div>
	<Container label="Indexer result based on Airdrop criteria">
		<Button slot="header">Export CSV</Button>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col">
				<Typography variant="h5">Insights</Typography>
				<Table {...insightsTable} />
			</div>
			<div class="flex flex-col gap-4">
				<Typography variant="h5">Allocation per eligible address</Typography>
				<div class="flex flex-row gap-4">
					<Input
						sizeVariant={EInputSizeVariant.FULL_WIDTH}
						placeholder="Type an address and click search..."
						RightIcon={SearchIcon}
					/>
					<Button>Search</Button>
				</div>
				<Table {...allocationTable} />
			</div>
		</div>
	</Container>
</div>
