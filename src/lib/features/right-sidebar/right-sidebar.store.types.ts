import type { Readable } from 'svelte/store';
import { ERightSideBarVariant } from '$lib/types';

export interface IRightSideBarConfig {
	variant: ERightSideBarVariant;
	state?: unknown;
}

export interface IRightSideBarState {
	rightSideBarConfig: IRightSideBarConfig;
}

export interface IRightSidebarStore {
	openRightSideBar: (modalConfig: IRightSideBarState['rightSideBarConfig']) => void;
	closeRightSideBar: () => void;
	activeRightSideBar: Readable<IRightSideBarConfig>;
	updateRightSideBarState: (state: object) => void;
}
