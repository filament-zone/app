import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		validatorId: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITableValidatorOptionsComponentProps_ = typeof __propDef.props;
export type { ITableValidatorOptionsComponentProps_ as ITableValidatorOptionsComponentProps };
export type ITableValidatorOptionsComponentEvents = typeof __propDef.events;
export type ITableValidatorOptionsComponentSlots = typeof __propDef.slots;

export default class TableValidatorOptionsComponent extends SvelteComponent<
	ITableValidatorOptionsComponentProps,
	ITableValidatorOptionsComponentEvents,
	ITableValidatorOptionsComponentSlots
> {}
