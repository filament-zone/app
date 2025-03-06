<script lang="ts">
	import moment from 'moment/moment.js';
	import { Button, Typography } from '$lib/components';
	import { capitalizeFirstLetter } from '$lib/helpers';
	import { type ICampaignTimeLineItemProps } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	let {
		title,
		description,
		date,
		status,
		isFirst,
		isLast,
		onButtonClick,
		buttonLabel,
		numericPhase,
		isExpanded = false
	}: ICampaignTimeLineItemProps = $props();

	const getStatusColor: (status: ICampaignTimeLineItemProps['status']) => string = $derived(
		(status) => {
			switch (status) {
				case 'passed':
					return 'var(--upOnly)';
				case 'ongoing':
					return 'var(--purpleCow)';
				case 'rejected':
					return 'var(--rugged)';
				default:
					return 'var(--foreground)';
			}
		}
	);

	let isLowOpacityBefore = $derived(status === 'ongoing');
	let isLowOpacityAfter = $derived(status === 'planned' || status === 'ongoing');
</script>

<div class="flex flex-row h-fit gap-5 timeline-item {status} {isExpanded ? 'open' : ''}">
	<div
		class="flex justify-center items-center w-[40px] relative {isExpanded ? 'open' : ''} {isFirst
			? 'isFirst'
			: ''} {isLast ? 'isLast' : ''} {isLowOpacityBefore
			? 'low-opacity-before'
			: ''} {isLowOpacityAfter ? 'low-opacity-after' : ''}"
	>
		<div
			class="icon-container {isExpanded ? 'open' : ''} {isFirst ? 'isFirst' : ''} {isLast
				? 'isLast'
				: ''}"
		>
			{#if status === 'passed'}
				<CheckmarkCircleIcon fill="var(--upOnly)" />
			{:else}
				<div class="circle-container {status} ">
					<div class="numbered-circle">{numericPhase}</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex justify-start items-center w-full">
		<div class="flex flex-col">
			<Typography variant="h6" color={getStatusColor(status)}>{title}</Typography>
			<div class="description-container">
				<Typography variant="caption" color="var(--foreground)">
					{description}
				</Typography>
			</div>
		</div>
	</div>
	{#if onButtonClick}
		<div class="flex flex-col justify-center items-end w-4/12">
			<Button onclick={onButtonClick}>{buttonLabel}</Button>
		</div>
	{:else if status === 'to-do'}
		<div class="flex flex-col justify-center items-end w-4/12">
			<Typography variant="caption" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{:else if date && status}
		<div class="flex flex-col items-end justify-b w-[140px] px-2">
			<div class="flex">
				<Typography variant="cardDate" classNames="text-right text-nowrap"
					>{moment(date).format('MMM D, YYYY')}</Typography
				>
			</div>
			<Typography variant="cardDate" color={getStatusColor(status)}>
				{capitalizeFirstLetter(status)}
			</Typography>
		</div>
	{/if}
</div>

<style lang="less">
	.low-opacity {
		&::before,
		&::after {
			opacity: 0.6;
		}
	}
	.icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		&.open {
			&::before,
			&::after {
				content: '';
				position: absolute;
				width: 2px;
				height: 20px;
				background-color: rgb(78, 78, 78);
			}
			&::before {
				height: 50% - 18px;
				top: -6px;
				visibility: visible;
			}
			&::after {
				height: 50% - 18px;
				bottom: -6px;
				visibility: visible;
			}
		}
		&.isFirst {
			&.open::before {
				visibility: hidden;
			}
		}
		&.isLast {
			&.open::after {
				visibility: hidden;
			}
		}
		&.isFirst {
			&.open::before {
				visibility: hidden;
			}
		}
		&.isLast {
			&.open::after {
				visibility: hidden;
			}
		}
	}
	.circle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--foreground);
		padding: 4px;
		border-radius: 50%;
		opacity: 0.6;
		background-color: var(--foreground);
	}
	.numbered-circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background-color: black;
		border-radius: 50%;
		color: white;
		font-weight: bold;
	}

	.timeline-item {
		border-radius: 4px;
		position: relative;
		padding-top: 10px;
		padding-bottom: 10px;

		&.open {
			&.passed,
			&.planned {
				opacity: 0.6;
			}
		}

		&.passed {
			.circle-container {
				background-color: var(--upOnly);
				opacity: 1;
			}
			.numbered-circle {
				background-color: var(--upOnly);
			}
		}
		&.ongoing {
			color: var(--purpleCow);
			.circle-container {
				background-color: var(--purpleCow);
				opacity: 1;
			}
			.numbered-circle {
				color: var(--purpleCow);
			}
		}
		&.planned {
			color: var(--foreground);

			.circle-container {
				background-color: var(--foreground);
			}
		}
		&.rejected {
			color: var(--rugged);
			.circle-container {
				background-color: var(--rugged);
				opacity: 1;
			}
			.numbered-circle {
				color: var(--rugged);
			}
		}
	}
</style>
