import { type Component } from 'svelte';

export interface ITokenIconNameContainerProps {
	tokenIcon: string | Component;
	tokenTicker: string;
	styles?: string;
}

export declare const TokenIconNameContainer: Component<ITokenIconNameContainerProps>;
export default TokenIconNameContainer;
