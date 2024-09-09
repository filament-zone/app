import { writable, derived } from 'svelte/store';
import { type IRightSideBarState, type IRightSidebarStore } from '$lib/types';
import { ERightSideBarVariant } from './right-sidebar.store.enums';

const initialState: IRightSideBarState = {
	rightSideBarConfig: {
		variant: ERightSideBarVariant.CLOSED
	}
};

const store = writable<IRightSideBarState>(initialState);

const closeRightSideBar: IRightSidebarStore['closeRightSideBar'] = () => {
	store.update((state) => {
		state.rightSideBarConfig = {
			variant: ERightSideBarVariant.CLOSED
		};
		return state;
	});
};

const openRightSideBar: IRightSidebarStore['openRightSideBar'] = (config) => {
	store.update((state) => {
		state.rightSideBarConfig = config;
		return state;
	});
};

const updateRightSideBarState: IRightSidebarStore['updateRightSideBarState'] = (statePayload) => {
	store.update((state) => {
		state.rightSideBarConfig.state = { ...statePayload };
		return state;
	});
};

const activeRightSideBar = derived(store, ($store) => $store.rightSideBarConfig);

export const rightSideBarStore: IRightSidebarStore = {
	openRightSideBar,
	closeRightSideBar,
	activeRightSideBar,
	updateRightSideBarState
};
