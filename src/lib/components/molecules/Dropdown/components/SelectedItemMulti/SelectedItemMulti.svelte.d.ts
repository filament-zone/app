import type { Component } from 'svelte';
import { IDropdownOption } from '$lib/types';

export interface ISelectedItemMultiProps {
	option: IDropdownOption;
	displayOnly?: boolean;
	onCloseIconClick: () => void;
}

export declare const SelectedItemMulti: Component<ISelectedItemMultiProps>;
export default SelectedItemMulti;
