import type { Component } from 'svelte';

export interface IModalConfirmationProps {
	title?: string;
	description?: string;
	onConfirm?: () => void;
	onConfirmLabel?: string;
	onDeny?: () => void;
	onDenyLabel?: string;
	disabledDeny?: boolean;
}

export declare const ModalConfirmation: Component<IModalConfirmationProps>;
export default ModalConfirmation;
