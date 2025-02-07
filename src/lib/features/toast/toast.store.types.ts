import type { Writable } from 'svelte/store';

export interface IToastConfig {
	id?: string;
	message: string;
	display?: boolean;
	options?: {
		duration?: number;
		persistent?: boolean;
		onClick?: () => void;
	};
}

export interface IToastStore {
	toasts: Writable<IToastConfig[]>;
	send: (toast: IToastConfig) => string;
	remove: (id: string) => void;
	update: (id: string, newMessage: string) => void;
	display: (id: string) => void;
	hide: (id: string) => void;
}
