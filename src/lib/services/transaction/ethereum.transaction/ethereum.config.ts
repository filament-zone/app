import { PUBLIC_FILAMENT_SC_ADDRESS } from '$env/static/public';
import delegatesABI from '$lib/services/transaction/ethereum.transaction/ethereum.transaction.config/campaign/delegates/delegates.json';
import { type JsonInterface } from '$lib/types';
import { EContract } from '$lib/services/transaction/ethereum.transaction/ethereum.enums';

export const SC_ABI_CONFIG: Record<EContract, JsonInterface> = {
	[EContract.FILAMENT_SC]: delegatesABI.abi
};

export const SC_ADDRESS_CONFIG: Record<EContract, string> = {
	[EContract.FILAMENT_SC]: PUBLIC_FILAMENT_SC_ADDRESS as string
};
