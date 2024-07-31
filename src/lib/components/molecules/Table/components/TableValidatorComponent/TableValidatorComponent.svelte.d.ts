import { type ComponentType, SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		Icon: ComponentType<SvelteComponent<unknown, unknown, unknown>>;
		label: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITableValidatorComponentProps_ = typeof __propDef.props;
export type { ITableValidatorComponentProps_ as ITableValidatorComponentProps };
export type ITableValidatorComponentEvents = typeof __propDef.events;
export type ITableValidatorComponentSlots = typeof __propDef.slots;

export default class TableValidatorComponent extends SvelteComponent<
	ITableValidatorComponentProps,
	ITableValidatorComponentEvents,
	ITableValidatorComponentSlots
> {}
