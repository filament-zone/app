export const shortCutTransactionHash = (tx: string): string => {
	return `${tx?.substring(0, 4)}...${tx?.substring(tx.length - 4)}`;
};
