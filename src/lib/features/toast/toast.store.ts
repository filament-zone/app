import { writable } from 'svelte/store';
import { v4 as uuidV4 } from 'uuid';
import type { IToastConfig, IToastStore } from '$lib/types';

const toasts = writable<IToastConfig[]>([]);

const remove: IToastStore['remove'] = (id) => {
	toasts.update((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
};

const send: IToastStore['send'] = (toast) => {
	const id = toast.id ?? uuidV4();
	const isPersistent = toast.options?.persistent ?? false;

	toasts.update((currentToasts) => [
		...currentToasts,
		{
			id,
			message: toast.message,
			display: toast.display ?? true,
			options: {
				duration: toast.options?.duration ?? 3000,
				persistent: isPersistent,
				onClick: toast.options?.onClick
			}
		}
	]);

	if (!isPersistent) {
		setTimeout(() => {
			remove(id);
		}, toast.options?.duration ?? 3000);
	}

	return id;
};

const update: IToastStore['update'] = (id, newMessage) => {
	toasts.update((currentToasts) => {
		return currentToasts.map((toast) =>
			toast.id === id ? { ...toast, message: newMessage } : toast
		);
	});
};

const display: IToastStore['display'] = (id) => {
	toasts.update((currentToasts) =>
		currentToasts.map((toast) => (toast.id === id ? { ...toast, display: true } : toast))
	);
};

const hide: IToastStore['hide'] = (id) => {
	toasts.update((currentToasts) =>
		currentToasts.map((toast) => (toast.id === id ? { ...toast, display: false } : toast))
	);
};

export const toastsStore: IToastStore = {
	toasts,
	send,
	remove,
	update,
	display,
	hide
};
