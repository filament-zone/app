<script lang="ts">
	import { Card, Dropdown, Input, Typography, TextArea } from '$lib/components';
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-3xl">
		<Typography>Create new Proposal</Typography>
		<Card label="Proposal Details" class="p-6 gap-4">
			<Dropdown label="Type" class="mt-2" placeholder="Choose proposal type" />
			<Input label="Title" placeholder="Enter proposal title" />
			<TextArea label="Description" rows="10" />
		</Card>
	</div>
</div>
