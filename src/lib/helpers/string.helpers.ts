export const shortCutTransactionHash = (tx: string): string => {
	return `${tx?.substring(0, 4)}...${tx?.substring(tx.length - 4)}`;
};
export const bigIntToHexId = (value: bigint): string => {
	return `0x${value.toString(16)}`;
};
