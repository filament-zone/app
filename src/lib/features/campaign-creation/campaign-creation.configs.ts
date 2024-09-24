import { type IDropdownOption } from '$lib/types';
import { ENetwork } from '$lib/features/campaign/campaign.enums';

export const networkOptions: IDropdownOption[] = [
	{ value: ENetwork.ETHEREUM, label: 'Ethereum' },
	{ value: ENetwork.ARPITRUM, label: 'Arbitrum' }
];
