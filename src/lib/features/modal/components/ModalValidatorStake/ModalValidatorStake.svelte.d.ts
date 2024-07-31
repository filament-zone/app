import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		validatorId?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalValidatorStakeProps_ = typeof __propDef.props;
export type { IModalValidatorStakeProps_ as IModalValidatorStakeProps };
export type IModalValidatorStakeEvents = typeof __propDef.events;
export type IModalValidatorStakeSlots = typeof __propDef.slots;

export default class ModalValidatorStake extends SvelteComponent<
	IModalValidatorStakeProps,
	IModalValidatorStakeEvents,
	IModalValidatorStakeSlots
> {}
