import { SvelteComponent } from 'svelte';
import type { IContract, NetworkE } from '$lib/types';

declare const __propDef: {
	props: {
		network?: NetworkE | null;
		contracts?: IContract[];
		displayOnly?: boolean;
		direction?: 'row' | 'col';
		label?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IAddContractInputProps_ = typeof __propDef.props;
export type { IAddContractInputProps_ as IAddContractInputProps };
export type IAddContractInputEvents = typeof __propDef.events;
export type IAddContractInputSlots = typeof __propDef.slots;

export default class AddContractInput extends SvelteComponent<
	IAddContractInputProps,
	IAddContractInputEvents,
	IAddContractInputSlots
> {}
