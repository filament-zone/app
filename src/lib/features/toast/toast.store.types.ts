import type { Writable } from 'svelte/store';

export interface IToastConfig {
	id?: string;
	message: string;
	options?: { duration: number };
}

export interface IToastStore {
	toasts: Writable<IToastConfig[]>;
	send: (toast: IToastConfig) => void;
	remove: (id: string) => void;
}
