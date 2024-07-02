// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Eip1193Provider } from 'ethers';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare namespace svelteHTML {
		interface HTMLAttributes {
			'on:clickOutside'?: (event: CustomEvent) => void;
		}
	}

	interface Window {
		ethereum?: Eip1193Provider;
	}
}

export {};
