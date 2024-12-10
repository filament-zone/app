<script lang="ts">
	import { onMount } from 'svelte';
	import { Typography } from '$lib/components';
	import ArrowLeft from '$lib/assets/icons/arrow-left.svg?component';
	import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';
	import type { IPaginationProps } from '$lib/types';

	export let pagination: IPaginationProps['pagination'];
	export let onPageChange: IPaginationProps['onPageChange'];

	let currentPage = 1;

	$: totalPages = pagination?.totalPages ?? 0;

	$: visiblePages = () => {
		const pages = [1];
		let lowerLimit, upperLimit;

		if (totalPages <= 5) {
			lowerLimit = 2;
			upperLimit = totalPages - 1;
		} else {
			if (currentPage <= 3) {
				lowerLimit = 2;
				upperLimit = 4;
			} else if (currentPage >= totalPages - 2) {
				lowerLimit = totalPages - 3;
				upperLimit = totalPages - 1;
			} else {
				lowerLimit = currentPage - 1;
				upperLimit = currentPage + 1;
			}
		}

		for (let i = lowerLimit; i <= upperLimit; i++) {
			pages.push(i);
		}

		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	$: goToPage = (page: number) => {
		currentPage = page;
		if (onPageChange) {
			onPageChange(page);
		}
	};

	$: handlePrevPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	$: handleNextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	onMount(() => {
		if (pagination?.currentPage) {
			currentPage = pagination.currentPage;
		}
	});
</script>

{#if pagination}
	<div class="flex flex-row justify-between text-white">
		<div
			on:click={handlePrevPage}
			class:disabled={currentPage <= 1}
			aria-hidden="true"
			class="cursor-pointer"
		>
			<ArrowLeft />
		</div>
		<ul class="">
			{#each visiblePages() as page, index}
				{#if index > 0 && page - visiblePages()[index - 1] !== 1}
					<li>
						<Typography variant="caption">...</Typography>
					</li>
				{/if}
				<li
					class:selected={currentPage === page}
					on:click={() => goToPage(page)}
					aria-hidden="true"
				>
					<Typography variant="caption">{page}</Typography>
				</li>
			{/each}
		</ul>
		<div
			on:click={handleNextPage}
			class:disabled={currentPage >= totalPages}
			aria-hidden="true"
			class="cursor-pointer"
		>
			<ArrowRight />
		</div>
	</div>
{/if}

<style lang="less">
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4px;

		li {
			min-width: 20px;
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			&.selected {
				border-radius: 4px;
				background-color: var(--filaMint-700);
				color: var(--upOnly-100);
			}
		}
	}
</style>
