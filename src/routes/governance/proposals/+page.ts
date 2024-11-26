import { flexRender } from '@tanstack/svelte-table';
import {
	LiveProposalsTableLabelComponent,
	ProposalTypeNameMap,
	ProposalStatusNameMap,
	ProposalStatusBadgeColorVariantMap
} from '$lib/features';
import { Badge, TableDateTimeComponent } from '$lib/components';
import { routes } from '$lib/constants';
import SearchIcon from '$lib/assets/icons/search.svg?component';
import {
	EBadgeColorVariant,
	EProposalStatus,
	EProposalType,
	type ISearchSelectProps,
	type ITableProps
} from '$lib/types';
import { goto } from '$app/navigation';

type TAllProposalsTableData = {
	id: string;
	title: string;
	type: EProposalType;
	status: EProposalStatus;
	votingEnd: Date;
};

export async function load() {
	const cards = [
		{
			label: 'Total',
			data: '51'
		},
		{
			label: 'Live',
			data: '0'
		},
		{
			label: 'Passed',
			data: '49'
		},
		{
			label: 'Rejected',
			data: '2'
		}
	];

	const searchSelectProps: ISearchSelectProps = {
		onChange: (value) => {
			console.log('searchSelect value', value);
		},
		inputProps: {
			placeholder: 'Search proposals...',
			LeftContent: SearchIcon
		},
		dropdownProps: {
			options: [
				{ label: 'Deposit Period', value: 'depositPeriod' },
				{ label: 'Voting Period', value: 'votingPeriod' },
				{ label: 'Passed', value: 'passed' },
				{ label: 'Rejected', value: 'rejected' },
				{ label: 'Failed', value: 'failed' },
				{ label: 'All', value: 'all' }
			]
		}
	};

	const tableRightLabelProps = {
		searchSelectProps: { ...searchSelectProps },
		buttonProps: {
			onClick: () => {
				goto(routes.GOVERNANCE.STAKING.CREATE_PROPOSAL);
			}
		}
	};

	const defaultLiveProposalsData: TAllProposalsTableData[] = [
		{
			id: '1',
			title: 'Proposal 1',
			type: EProposalType.CREATE_STREAM,
			status: EProposalStatus.OPEN,
			votingEnd: new Date()
		},
		{
			id: '2',
			title: 'Proposal 2',
			type: EProposalType.PARAMETER_CHANGE,
			status: EProposalStatus.REJECTED,
			votingEnd: new Date()
		}
	];

	const tableLiveProposalsData: ITableProps = {
		tableLabel: 'Live Proposals',
		tableRightLabel: LiveProposalsTableLabelComponent,
		tableRightLabelProps: { ...tableRightLabelProps },
		columnDef: [
			{
				accessorKey: 'id',
				header: '#',
				size: 30,
				meta: {
					class: 'sticky',
					cellStyle: {
						color: 'var(--gray-200)'
					}
				}
			},
			{
				accessorKey: 'title',
				header: 'Title',
				size: 150,
				meta: {
					class: 'sticky',
					cellStyle: {
						width: 'calc(65% - 30px)'
					}
				}
			},
			{
				accessorKey: 'type',
				header: 'Type',
				cell: (info) => {
					const label = info.getValue() as unknown as TAllProposalsTableData['type'];
					return flexRender(Badge, {
						label: ProposalTypeNameMap[label],
						colorVariant: EBadgeColorVariant.PRIMARY
					});
				},
				meta: {
					cellStyle: {
						width: '20%'
					}
				}
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: (info) => {
					const status = info.getValue() as unknown as TAllProposalsTableData['status'];
					return flexRender(Badge, {
						label: ProposalStatusNameMap[status],
						colorVariant: ProposalStatusBadgeColorVariantMap[status]
					});
				},
				meta: {
					cellStyle: {
						width: '20%'
					}
				}
			},
			{
				accessorKey: 'votingEnd',
				header: 'Voting End',
				cell: (info) => {
					const date = info.getValue() as unknown as TAllProposalsTableData['votingEnd'];
					return flexRender(TableDateTimeComponent, { ...date });
				},
				meta: {
					cellStyle: {
						width: '15%'
					}
				}
			}
		],
		data: defaultLiveProposalsData
	};

	return {
		cards,
		tableLiveProposalsData
	};
}
