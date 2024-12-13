import { type IDropdownOption } from '$lib/types';
import { ENetwork } from '$lib/api/hub/campaign/campaign.hub.api.enums';

export const networkOptions: IDropdownOption[] = [
	{ value: ENetwork.ETHEREUM, label: 'Ethereum' },
	{ value: ENetwork.ARPITRUM, label: 'Arbitrum' }
];
