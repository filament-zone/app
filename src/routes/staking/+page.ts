import { renderComponent } from '@tanstack/svelte-table';
import { modalStore } from '$lib/features';
import {
	Dropdown,
	SearchSelect,
	TableValidatorComponent,
	TableValidatorOptionsComponent
} from '$lib/components';
import SearchIcon from '$lib/assets/icons/search.svg?component';
import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';

import {
	EModalVariant,
	type IDropdownProps,
	type ISearchSelectProps,
	type ITableProps,
	type IDelegator
} from '$lib/types';

export type TDelegationsTableData = {
	id: string;
	delegate: IDelegator;
	staked: string;
	rewards: string;
};

type TDelegatesTableData = {
	id: string;
	delegate: IDelegator;
	votingPower: string;
	commission: string;
	options: {
		delegate: IDelegator;
	};
};

export async function load() {
	const { openModal } = modalStore;

	const cards = [
		{
			label: 'Available Balance',
			data: '5 FILA'
		},
		{
			label: 'Staked Amount',
			data: '10 FILA'
		},
		{
			label: 'Unstaking Amount',
			data: '20 FILA'
		},
		{
			label: 'Claimable Rewards',
			data: '< 0.00005 FILA'
		}
	];

	const mockedDelegations: TDelegationsTableData[] = [
		{
			id: '1',
			delegate: {
				id: '1',
				Icon: FilamentLogo,
				label: 'Filament Network'
			},
			staked: '10 FILA',
			rewards: '0.00005 FILA'
		},
		{
			id: '2',
			delegate: {
				id: '2',
				Icon: FilamentLogo,
				label: 'Filament Network Secondary'
			},
			staked: '20 FILA',
			rewards: '0.0001 FILA'
		}
	];

	const dropdownProps = {
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' }
		],
		onChange: (selectedOption: IDropdownProps['value']) => {
			console.log('dropdown value', selectedOption);
		},
		isSearchable: true
	};

	const tableDelegationsData: ITableProps = {
		tableLabel: 'My Delegations',
		tableRightLabel: Dropdown,
		tableRightLabelProps: { ...dropdownProps },
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
				accessorKey: 'delegate',
				header: 'Delegate',
				size: 200,
				cell: (info) => {
					const value = info.getValue() as unknown as TDelegationsTableData['delegate'];
					return renderComponent(TableValidatorComponent, { ...value });
				},
				meta: {
					class: 'sticky'
				}
			},
			{
				accessorKey: 'staked',
				header: 'Staked'
			},
			{
				accessorKey: 'rewards',
				header: 'Rewards'
			},
			{
				accessorKey: 'options',
				header: '',
				cell: (info) => {
					const delegate = info.getValue() as unknown as TDelegationsTableData['delegate'];
					return renderComponent(TableValidatorOptionsComponent, {
						buttonLabel: 'Claim Rewards',
						disabled: true,
						buttonOnClick: () => {
							console.log('Claim rewards, delegate:', delegate);
						},
						options: [
							{ value: 'stakeMore', label: 'Stake More', disabled: true },
							{ value: 'redelegate', label: 'Redelegate', disabled: true },
							{ value: 'unstake', label: 'Unstake', disabled: true }
						]
					});
				},
				meta: {
					cellStyle: {
						display: 'flex',
						'justify-content': 'flex-end',
						width: '100% !important'
					}
				}
			}
		],
		data: mockedDelegations
	};

	const searchSelectProps: ISearchSelectProps = {
		onChange: (value) => {
			console.log('searchSelect value', value);
		},
		inputProps: {
			placeholder: 'Search delegates...',
			LeftContent: SearchIcon
		},
		dropdownProps: {
			options: [
				{ label: 'label 1', value: 'label_1' },
				{ label: 'label 2', value: 'label_2' },
				{ label: 'label 3', value: 'label_3' },
				{ label: 'label 4', value: 'label_4' }
			]
		}
	};

	const mockedDelegates: TDelegatesTableData[] = [
		{
			id: '1',
			delegate: {
				id: '1',
				Icon: FilamentLogo,
				label: 'Squid Rambo'
			},
			votingPower: '141,212 FILA',
			commission: '14% (max 15%)',
			options: {
				delegate: {
					id: '1',
					Icon: FilamentLogo,
					label: 'Filament Network'
				}
			}
		},
		{
			id: '2',
			delegate: {
				id: '2',
				Icon: FilamentLogo,
				label: 'AI XBT'
			},
			votingPower: '232,123 FILA',
			commission: '10% (max 20%)',
			options: {
				delegate: {
					id: '2',
					Icon: FilamentLogo,
					label: 'Filament Network Secondary'
				}
			}
		}
	];

	const tableAllValidatorsData: ITableProps = {
		tableLabel: 'All Delegates',
		tableRightLabel: SearchSelect,
		tableRightLabelProps: { ...searchSelectProps },
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
				accessorKey: 'delegate',
				header: 'Delegate',
				size: 200,
				cell: (info) => {
					const value = info.getValue() as unknown as TDelegatesTableData['delegate'];
					return renderComponent(TableValidatorComponent, { ...value });
				},
				meta: {
					class: 'sticky'
				}
			},
			{
				accessorKey: 'votingPower',
				header: 'Voting Power'
			},
			{
				accessorKey: 'commission',
				header: 'Commission'
			},
			{
				accessorKey: 'options',
				header: '',
				cell: (info) => {
					const { delegate } = info.getValue() as unknown as TDelegatesTableData['options'];
					return renderComponent(TableValidatorOptionsComponent, {
						buttonLabel: 'Delegate FILA',
						buttonOnClick: () => {
							openModal({
								variant: EModalVariant.VALIDATOR_STAKE,
								state: { delegate }
							});
						}
					});
				},
				meta: {
					cellStyle: {
						display: 'flex',
						'justify-content': 'flex-end',
						width: '100% !important'
					}
				}
			}
		],
		data: mockedDelegates
	};

	return {
		cards,
		tableDelegationsData,
		tableAllValidatorsData
	};
}
