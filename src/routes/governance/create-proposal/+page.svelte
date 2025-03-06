<script lang="ts">
	import {
		Card,
		Dropdown,
		Input,
		Typography,
		TextArea,
		InputTokenField,
		Button,
		Breadcrumbs
	} from '$lib/components';
	import { EButtonSizeVariant } from '$lib/types';

	let { data } = $props();
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-3xl flex flex-col gap-4">
		<Breadcrumbs class="self-start" />
		<Typography>Create new Proposal</Typography>
		<Card label="Proposal Details" classNames="p-6 gap-4">
			<Dropdown label="Type" classNames="mt-2" placeholder="Choose proposal type" />
			<Input label="Title" placeholder="Enter proposal title" />
			<TextArea label="Description" rows={10} />
		</Card>
		<Card label="Initial Deposit" classNames="p-6 gap-4">
			<InputTokenField {...data.inputTokenFieldData} />
			<Typography classNames="text-end" variant="caption" color="var(--gray-200)"
				>Available: 0.00 FILA</Typography
			>
			<Button disabled sizeVariant={EButtonSizeVariant.FULL_WIDTH}>Create</Button>
			<Card>
				<div class="flex flex-row justify-between">
					<Typography variant="caption" color="var(--gray-200)">Estimated fee</Typography>
					<Typography variant="caption" color="var(--gray-200)">- FILA</Typography>
				</div>
			</Card>
		</Card>
	</div>
</div>
