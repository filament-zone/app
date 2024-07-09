import { writable } from 'svelte/store';
import { v4 as uuidV4 } from 'uuid';
import type { IToastConfig, IToastStore } from '$lib/types';

const toasts = writable<IToastConfig[]>([]);

const send: IToastStore['send'] = (toast) => {
	const id = uuidV4();
	toasts.update((toasts) => [
		...toasts,
		{
			id: id,
			message: toast.message,
			options: { duration: toast.options?.duration ?? 3000 }
		}
	]);

	setTimeout(() => {
		remove(id);
	}, toast.options?.duration ?? 3000);
};

const remove: IToastStore['remove'] = (id) => {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
};

export const toastsStore: IToastStore = {
	toasts,
	send,
	remove
};
