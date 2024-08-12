import { redirect } from '@sveltejs/kit';
import { routes } from '$lib/constants';

export function load(event) {
	if (event.url.pathname === '/page-2') {
		redirect(301, routes.PAGE_2.SUBPAGE_1.ROOT);
	}
}
