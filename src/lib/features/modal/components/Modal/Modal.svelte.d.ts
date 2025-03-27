import { type Component } from 'svelte';

export interface IModalProps {
	closeOnClickOutside?: boolean;
	classNames?: string;
	width?: string;
	onClickOutside?: () => void;
	header?: Snippet;
	content?: Snippet;
	footer?: Snippet;
}

export declare const Modal: Component<IModalProps>;
export default Modal;
