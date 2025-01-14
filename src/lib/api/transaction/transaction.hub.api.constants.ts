export enum TRANSACTION_HUB_URLS {
	SEND_TX = '/sequencer/batches',
	GET_TX_STATUS_SEQUENCER = '/sequencer/txs/:txHash',
	GET_TX_STATUS_LEDGER = '/ledger/txs/:txHash'
}

export enum TRANSACTION_HUB_WS_URLS {
	WS_TX_STATUS_SEQUENCER = '/websocket/txs/:txHash/ws'
}
