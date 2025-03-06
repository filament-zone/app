import type { Component } from 'svelte';

export interface ITickerProps {
	name: string | null;
	date: string | null;
	status: string | null;
}

export declare const Ticker: Component<ITickerProps>;
export default Ticker;
