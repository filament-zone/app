import { writable, derived } from 'svelte/store';
import { type IModalState, type IModalStore, EModalVariant } from '$lib/types';
const initialState: IModalState = {
	modalConfig: {
		variant: EModalVariant.CLOSED,
		state: null
	}
};

const store = writable<IModalState>(initialState);

const closeModal: IModalStore['closeModal'] = () => {
	store.update((state) => {
		state.modalConfig.variant = EModalVariant.CLOSED;
		return state;
	});
};

const openModal: IModalStore['openModal'] = (modalConfig) => {
	store.update((state) => {
		state.modalConfig = modalConfig;
		return state;
	});
};

const updateModalConfig: IModalStore['updateModalConfig'] = (updates) => {
	store.update((state) => {
		state.modalConfig = { ...state.modalConfig, ...updates };
		return state;
	});
};

const activeModal = derived(store, ($store) => $store.modalConfig.variant);
const modalConfig = derived(store, ($store) => $store.modalConfig);

export const modalStore: IModalStore = {
	openModal,
	closeModal,
	activeModal,
	modalConfig,
	updateModalConfig
};
