import type { Component } from 'svelte';
import { EBadgeColorVariant, EBadgeWidthVariant } from '$lib/types';

export interface IBadgeProps {
	label: string;
	colorVariant: EBadgeColorVariant;
	widthVariant?: EBadgeWidthVariant;
	LeftContent?: Component | string | null;
	RightContent?: Component | string | null;
	textColor?: string;
	RightContentColorVariant?: string;
}

export declare const Badge: Component<IBadgeProps>;
export default Badge;
