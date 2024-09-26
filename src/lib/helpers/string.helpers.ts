export const shortCutTransactionHash = (tx: string): string => {
	return `${tx?.substring(0, 4)}...${tx?.substring(tx.length - 4)}`;
};
export const bigIntToHexId = (value: bigint): string => {
	return `0x${value.toString(16)}`;
};

export const capitalizeFirstLetter = (str: string): string => {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
};
