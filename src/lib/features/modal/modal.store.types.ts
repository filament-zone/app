import type { Readable } from 'svelte/store';
import type { EModalVariant } from '$lib/types';

export interface IModalConfig {
	variant: EModalVariant;
	state?: unknown;
}

export interface IModalState {
	modalConfig: IModalConfig;
}

export interface IModalStore {
	openModal: (modalConfig: IModalState['modalConfig']) => void;
	closeModal: () => void;
	activeModal: Readable<EModalVariant>;
	modalConfig: Readable<IModalState['modalConfig']>;
}
