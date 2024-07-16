import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { breakpoints } from '$lib/constants';
import { eventListener } from '$lib/helpers';
import { debounce } from '$lib/utils';

export const screenDetect = () => {
	const screenType = writable({
		isLayoutXs: false,
		isLayoutSm: false,
		isLayoutMd: false,
		isLayoutLg: false,
		isLayoutXl: false,
		isLayout2Xl: false,
		isLayout3Xl: false,
		currentScreen: 'xs'
	});

	function detectScreen() {
		const width = window.innerWidth;
		let currentScreen = 'xs';

		const updatedScreenType = {
			isLayoutXs: width >= breakpoints.xs,
			isLayoutSm: width >= breakpoints.sm,
			isLayoutMd: width >= breakpoints.md,
			isLayoutLg: width >= breakpoints.lg,
			isLayoutXl: width >= breakpoints.xl,
			isLayout2Xl: width >= breakpoints['2xl'],
			isLayout3Xl: width >= breakpoints['3xl']
		};

		if (updatedScreenType.isLayout3Xl) currentScreen = '3xl';
		else if (updatedScreenType.isLayout2Xl) currentScreen = '2xl';
		else if (updatedScreenType.isLayoutXl) currentScreen = 'xl';
		else if (updatedScreenType.isLayoutLg) currentScreen = 'lg';
		else if (updatedScreenType.isLayoutMd) currentScreen = 'md';
		else if (updatedScreenType.isLayoutSm) currentScreen = 'sm';
		else currentScreen = 'xs';

		screenType.set({ ...updatedScreenType, currentScreen });
	}

	onMount(() => {
		detectScreen();
	});

	eventListener('resize', debounce(detectScreen, 100));

	return screenType;
};
