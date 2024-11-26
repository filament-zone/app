import { SvelteComponent } from 'svelte';
import { IListProps } from '$lib/types';

declare const __propDef: {
	props: {
		buttonOnClick: () => void;
		buttonLabel: string;
		options?: IListProps['options'];
		disabled?: boolean;
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
