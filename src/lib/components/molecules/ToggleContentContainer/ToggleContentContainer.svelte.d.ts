import type { Component, Snippet } from 'svelte';

export type TToggleContentContainerSelected = 'isFirst' | 'isSecond';

export interface IToggleContentContainerProps {
	selected: TToggleContentContainerSelected;
	first?: Snippet;
	second?: Snippet;
}

export declare const ToggleContentContainer: Component<IToggleContentContainerProps>;
export default ToggleContentContainer;
