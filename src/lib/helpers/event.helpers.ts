import { onMount, onDestroy } from 'svelte';
import { browser } from '$app/environment';

export const eventListener = (
	eventName: string,
	handler: EventListenerOrEventListenerObject,
	element?: Window | HTMLElement,
	options?: AddEventListenerOptions | boolean
) => {
	onMount(() => {
		if (browser) {
			window.addEventListener(eventName, handler, options);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener(eventName, handler, options);
		}
	});
};
