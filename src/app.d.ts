// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { BrowserProvider, Eip1193Provider } from 'ethers';
import '@poppanator/sveltekit-svg/dist/svg';
import type { RowData } from '@tanstack/table-core';
import type { AccessorFn } from '@tanstack/svelte-table';

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
		ethereum?: { isMetaMask?: boolean } & BrowserProvider & Eip1193Provider;
	}
}

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		class?: string;
		cellStyle?: Record<string, string>;
		customAccessor?: AccessorFn<TData, TValue>;
	}
}

export {};
