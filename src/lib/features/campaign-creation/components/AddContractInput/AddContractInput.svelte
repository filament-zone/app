<script lang="ts">
	import { Button, Dropdown, Input, Label } from '$lib/components';
	import { networkOptions } from '$lib/features';
	import { shortCutTransactionHash } from '$lib/helpers';
	import {
		EButtonColorVariant,
		EButtonSizeVariant,
		type IAddContractInputProps,
		EInputSizeVariant,
		ENetwork
	} from '$lib/types';
	import SearchIcon from '$lib/assets/icons/search.svg?component';
	import CloseIcon from '$lib/assets/icons/close-8px.svg?component';

	export let contracts: IAddContractInputProps['contracts'] = [];
	export let displayOnly: IAddContractInputProps['displayOnly'] = false;
	export let direction: IAddContractInputProps['direction'] = 'col';
	export let label: IAddContractInputProps['label'];

	let inputAddressValue: string = '';
	let network: ENetwork | null = null;

	const handleAddAddress = () => {
		if (!inputAddressValue || !network) {
			return;
		}

		if (contracts?.length) {
			contracts = [...contracts, { network, address: inputAddressValue }];
		} else {
			contracts = [{ network, address: inputAddressValue }];
		}

		inputAddressValue = '';
	};

	const handleDeleteItem = (index: number) => {
		if (contracts?.length) {
			contracts = [...contracts.filter((_, i) => i !== index)];
		}
	};

	const handleSubmit = (event: Event) => {
		event.preventDefault();
	};
</script>

<div class="w-full">
	<Label {label} />
	<div class="flex flex-col gap-4">
		<div
			class="list-container flex-{direction} {direction === 'col' ? '' : 'min-h-[35px] flex-wrap'}"
		>
			{#if contracts}
				{#each contracts as contract, index}
					<div class="container-list-item {direction === 'col' ? 'justify-start' : ''} ">
						<span>
							<span class="network">{contract.network}/</span>
							<span class="address">{shortCutTransactionHash(contract.address)}</span>
						</span>

						{#if !displayOnly}
							<div
								class="icon {direction === 'col' ? 'ml-auto' : ''}"
								on:click={() => handleDeleteItem(index)}
								aria-hidden="true"
							>
								<CloseIcon />
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
		{#if !displayOnly}
			<form on:submit={handleSubmit}>
				<div class="flex flex-{direction} gap-4">
					<Dropdown
						placeholder="e.g. Osmosis"
						isSearchable
						bind:value={network}
						sizeVariant={direction === 'col'
							? EInputSizeVariant.FULL_WIDTH
							: EInputSizeVariant.SMALL}
						options={networkOptions}
					/>
					<Input placeholder="Search ..." RightIcon={SearchIcon} bind:value={inputAddressValue} />
					<Button
						colorVariant={EButtonColorVariant.PRIMARY}
						sizeVariant={direction === 'col'
							? EButtonSizeVariant.FULL_WIDTH
							: EButtonSizeVariant.PRIMARY}
						on:click={handleAddAddress}>Add Address</Button
					>
				</div>
			</form>
		{/if}
	</div>
</div>

<style lang="less">
	.list-container {
		display: flex;
		gap: 6px;
		padding: 6px;
		background-color: #1d1d1d;
		width: 100%;
		border-radius: 4px;
		min-height: 35px;
	}

	.container-list-item {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 10px;
		background-color: #0d0e10;
		padding: 4px 10px;
		height: 23px;
		border-radius: 4px;

		.network,
		.address {
			font-size: 14px;
			font-style: normal;
			font-weight: 300;
			line-height: 14px;
		}

		.network {
			color: #535353;
		}

		.address {
			color: #77e4ff;
		}

		.icon {
			cursor: pointer;
			padding: 4px;
			background-color: #1a1a1a;
			border-radius: 4px;
		}
	}
</style>
