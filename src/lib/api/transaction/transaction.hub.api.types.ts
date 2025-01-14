export interface EventRange {
	start: number;
	end: number;
	events: unknown[];
}

export interface ReceiptData {
	gas_used: number[];
}

export interface Receipt {
	result: string;
	data: ReceiptData;
}

export interface IGetTxStatusLedgerResponse {
	type: string;
	number: number;
	hash: string;
	batch_number: number;
	body: string;
	event_range: EventRange;
	receipt: Receipt;
	meta: Record<string, unknown>;
}
