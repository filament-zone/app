import type { Component } from 'svelte';

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

export interface IPaginationProps {
	pagination?: IPagination;
	onPageChange?: (page: number) => void;
}

export declare const Pagination: Component<IPaginationProps>;
export default Pagination;
