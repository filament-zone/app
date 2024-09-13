import { ENetwork, type IDropdownOption } from '$lib/types';

export const networkOptions: IDropdownOption[] = [
	{ value: ENetwork.ETHEREUM, label: 'Ethereum' },
	{ value: ENetwork.ARPITRUM, label: 'Arbitrum' }
];
