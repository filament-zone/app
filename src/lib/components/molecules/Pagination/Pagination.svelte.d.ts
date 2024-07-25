import { SvelteComponent } from 'svelte';
import '@tanstack/svelte-Pagination';

export interface IPagination {
	pageSize: number;
	totalRows: number;
	currentPage: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startIndex: number;
	endIndex: number;
}

declare const __propDef: {
	props: {
		pagination?: IPagination;
		onPageChange?: (page: number) => void;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPaginationProps_ = typeof __propDef.props;
export type { IPaginationProps_ as IPaginationProps };
export type IPaginationEvents = typeof __propDef.events;
export type IPaginationSlots = typeof __propDef.slots;

export default class Pagination extends SvelteComponent<
	IPaginationProps,
	IPaginationEvents,
	IPaginationSlots
> {}
