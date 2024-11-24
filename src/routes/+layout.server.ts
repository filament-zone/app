import { redirect } from '@sveltejs/kit';
import { routes } from '$lib/constants';

export function load(event) {
	if (event.url.pathname === '/governance') {
		redirect(301, routes.OVERVIEW.ROOT);
	}
}
