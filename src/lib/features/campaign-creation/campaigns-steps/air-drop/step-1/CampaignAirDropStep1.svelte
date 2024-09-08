<script lang="ts">
	import { Container, Input, Table, TextArea, Typography } from '$lib/components';
	import { EInputSizeVariant } from '$lib/types';
</script>

<div class="flex flex-col gap-5">
	<Container label="Introduction">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>On this page you can start to setup your airdrop. Please provide a general description
				which introduces the campaign details. Try to write in a concise, comprehensible and
				structured form.
			</Typography>
			<Input
				label="Campaign Title"
				placeholder="e.g., April Ad Campaign to increase user number"
				sizeVariant={EInputSizeVariant.MEDIUM}
			/>
			<TextArea
				label="Description"
				placeholder="Type here..."
				sizeVariant={EInputSizeVariant.FULL_WIDTH}
			/>
		</div>
	</Container>
	<Container label="Election of delegates">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				In this step you can select the set of delegates that you would like to involve in the
				process of your campaign. The delegates are responsible for finding consensus about your
				airdrop eligibility criteria via Filament’s decentralized process even before you launch and
				distribute your token.
			</Typography>
			<Typography variant="caption">
				Your option here is to either involve all delegates or evict up to three from the active
				set. The cost for evicting is calculated algorithmically by the Filament Hub depending on
				multiple factors such as the voting power of a delegate.
			</Typography>
			<Input
				label="Max. evictable delegates"
				placeholder="e.g., April Ad Campaign to increase user number"
				sizeVariant={EInputSizeVariant.MEDIUM}
			/>
			<Table tableLabel="Active Delegates" />
			<Table tableLabel="Evicted Delegates" />
		</div>
	</Container>
</div>
