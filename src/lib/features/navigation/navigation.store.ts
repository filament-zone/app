import { navigating } from '$app/stores';
import { writable } from 'svelte/store';
import { beforeNavigate } from '$app/navigation';

const previousPage = writable('');

export const navigationStore = {
	navigating,
	previousPage,
	beforeNavigate
};
