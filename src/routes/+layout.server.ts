import { redirect } from '@sveltejs/kit';
import { routes } from '$lib/constants';

export function load(event) {
	if (event.url.pathname === '/delegates') {
		redirect(301, routes.DELEGATES.SUBPAGE_1.ROOT);
	}
}
