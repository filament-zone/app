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
import { type ComponentType, SvelteComponent } from 'svelte';
import {
	EModalVariant,
	type IDropdownProps,
	type ISearchSelectProps,
	type ITableProps,
	type IValidator
} from '$lib/types';

export type TDelegationsTableData = {
	id: string;
	validator: IValidator;
	staked: string;
	rewards: string;
};

type TValidatorsTableData = {
	id: string;
	validator: IValidator;
	votingPower: string;
	commission: string;
	options: {
		validator: IValidator;
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
			validator: {
				id: '1',
				Icon: FilamentLogo,
				label: 'Filament Network'
			},
			staked: '10 FILA',
			rewards: '0.00005 FILA'
		},
		{
			id: '2',
			validator: {
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

	const tableDelegationsData: ITableProps & { tableRightLabel: ComponentType<SvelteComponent> } = {
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
					const validator = info.getValue() as unknown as TValidatorsTableData['validator'];
					return flexRender(TableValidatorOptionsComponent, {
						buttonLabel: 'Claim Rewards',
						disabled: true,
						buttonOnClick: () => {
							console.log('claim rewards', validator);
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
		data: mockedDelegations
	};

	const searchSelectProps: ISearchSelectProps = {
		onChange: (value) => {
			console.log('searchSelect value', value);
		},
		inputProps: {
			placeholder: 'Search validators...',
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

	const mockedValidators: TValidatorsTableData[] = [
		{
			id: '1',
			validator: {
				id: '1',
				Icon: FilamentLogo,
				label: 'Filament Network'
			},
			votingPower: '141,212 FILA',
			commission: '14% (max 15%)',
			options: {
				validator: {
					id: '1',
					Icon: FilamentLogo,
					label: 'Filament Network'
				}
			}
		},
		{
			id: '2',
			validator: {
				id: '2',
				Icon: FilamentLogo,
				label: 'Filament Network Secondary'
			},
			votingPower: '232,123 FILA',
			commission: '10% (max 20%)',
			options: {
				validator: {
					id: '2',
					Icon: FilamentLogo,
					label: 'Filament Network Secondary'
				}
			}
		}
	];

	const tableAllValidatorsData: ITableProps & { tableRightLabel: ComponentType<SvelteComponent> } =
		{
			tableLabel: 'All Validators',
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
						const { validator } = info.getValue() as unknown as TValidatorsTableData['options'];
						return flexRender(TableValidatorOptionsComponent, {
							buttonLabel: 'Stake',
							buttonOnClick: () => {
								openModal({
									variant: EModalVariant.VALIDATOR_STAKE,
									state: { validator }
								});
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
			data: mockedValidators
		};

	return {
		cards,
		tableDelegationsData,
		tableAllValidatorsData
	};
}
