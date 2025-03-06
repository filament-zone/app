import type { Component } from 'svelte';

export interface IToastProps {
	config?: IToastConfig;
	onclick?: () => void;
}

export declare const IToast: Component<IToastProps>;
export default IToast;
