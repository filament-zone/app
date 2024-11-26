import { flexRender } from '@tanstack/svelte-table';
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
	type ITableValidatorComponentProps
} from '$lib/types';

type TDelegationsTableData = {
	id: string;
	validator: ITableValidatorComponentProps;
	staked: string;
	rewards: string;
};

type TValidatorsTableData = {
	id: string;
	validator: ITableValidatorComponentProps;
	votingPower: string;
	commission: string;
	options: {
		validatorId: TValidatorsTableData['id'];
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

	const defaultDelegationsData: TDelegationsTableData[] = [
		{
			id: '1',
			validator: {
				Icon: FilamentLogo,
				label: 'Filament Network'
			},
			staked: '10 FILA',
			rewards: '0.00005 FILA'
		},
		{
			id: '2',
			validator: {
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
				accessorKey: 'validator',
				header: 'Validator',
				size: 200,
				cell: (info) => {
					const value = info.getValue() as unknown as TDelegationsTableData['validator'];
					return flexRender(TableValidatorComponent, { ...value });
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
					const value = info.getValue() as unknown as TValidatorsTableData['validator'];
					return flexRender(TableValidatorOptionsComponent, {
						...value,
						buttonLabel: 'Claim Rewards',
						disabled: true
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
		data: defaultDelegationsData
	};

	const searchSelectProps: ISearchSelectProps = {
		onChange: (value) => {
			console.log('searchSelect value', value);
		},
		inputProps: {
			placeholder: 'Search validators...',
			LeftIcon: SearchIcon
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

	const defaultValidatorsData: TValidatorsTableData[] = [
		{
			id: '1',
			validator: {
				Icon: FilamentLogo,
				label: 'Filament Network'
			},
			votingPower: '141,212 FILA',
			commission: '14% (max 15%)',
			options: {
				validatorId: '1'
			}
		},
		{
			id: '2',
			validator: {
				Icon: FilamentLogo,
				label: 'Filament Network Secondary'
			},
			votingPower: '232,123 FILA',
			commission: '10% (max 20%)',
			options: {
				validatorId: '2'
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
				accessorKey: 'validator',
				header: 'Validator',
				size: 200,
				cell: (info) => {
					const value = info.getValue() as unknown as TValidatorsTableData['validator'];
					return flexRender(TableValidatorComponent, { ...value });
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
					const value = info.getValue() as unknown as TValidatorsTableData['validator'];
					return flexRender(TableValidatorOptionsComponent, {
						...value,
						buttonLabel: 'Stake',
						buttonOnClick: () => {
							openModal({ variant: EModalVariant.VALIDATOR_STAKE, state: { validatorId: value } });
						},
						options: [
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
		data: defaultValidatorsData
	};

	return {
		cards,
		tableDelegationsData,
		tableAllValidatorsData
	};
}
