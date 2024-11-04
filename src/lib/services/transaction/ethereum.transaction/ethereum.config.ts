import { env } from '$env/dynamic/public';
import { delegatesABI } from '$lib/services';
import { type JsonInterface, EContract } from '$lib/types';

export const SC_ABI_CONFIG: Record<EContract, JsonInterface> | null = {
	[EContract.FILAMENT_SC]: delegatesABI.abi
};

export const SC_ADDRESS_CONFIG: Record<EContract, string> | null = {
	[EContract.FILAMENT_SC]: env.PUBLIC_FILAMENT_SC_ADDRESS as string
};
