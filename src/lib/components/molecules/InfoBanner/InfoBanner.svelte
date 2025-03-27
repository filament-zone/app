<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Button, Badge } from '$lib/components/atoms';
	import { EButtonStyleVariant } from '$lib/components/atoms/Button/Button.enums';
	import { EInfoBannerStyleVariant, EInfoBannerPositionVariant } from './InfoBanner.enums';
	import { EBadgeColorVariant } from '$lib/types';

	export let id = 'infoBanner'; // Unique ID for localStorage
	export let title = 'Notification';
	export let description = '';
	export let styleVariant: EInfoBannerStyleVariant = EInfoBannerStyleVariant.PRIMARY;
	export let positionVariant: EInfoBannerPositionVariant = EInfoBannerPositionVariant.STATIC;
	export let dismissible = true;
	export let buttonText = 'Acknowledged';
	export let badgeColorVariant = EBadgeColorVariant.PRIMARY;

	const showBanner = writable(true);

	// Check local storage on mount
	onMount(() => {
		const bannerAcknowledged = localStorage.getItem(`${id}Acknowledged`);
		if (bannerAcknowledged === 'true') {
			showBanner.set(false);
		}
	});

	// Function to dismiss the banner
	function acknowledgeBanner() {
		showBanner.set(false);
		localStorage.setItem(`${id}Acknowledged`, 'true');
	}

	// Helper to determine button style based on banner style
	function getButtonStyleVariant() {
		switch (styleVariant) {
			case EInfoBannerStyleVariant.POSITIVE:
				return EButtonStyleVariant.POSITIVE;
			case EInfoBannerStyleVariant.NEGATIVE:
				return EButtonStyleVariant.NEGATIVE;
			case EInfoBannerStyleVariant.HIGHLIGHT:
				return EButtonStyleVariant.HIGHLIGHT;
			case EInfoBannerStyleVariant.RUGGED:
				return EButtonStyleVariant.NEGATIVE;
			default:
				return EButtonStyleVariant.PRIMARY;
		}
	}

	// Map InfoBanner styles to Badge color variants
	function getBadgeColorVariant() {
		switch (styleVariant) {
			case EInfoBannerStyleVariant.POSITIVE:
				return EBadgeColorVariant.SUCCESS;
			case EInfoBannerStyleVariant.NEGATIVE:
				return EBadgeColorVariant.REJECTED;
			case EInfoBannerStyleVariant.RUGGED:
				return EBadgeColorVariant.REJECTED;
			case EInfoBannerStyleVariant.WARNING:
				return EBadgeColorVariant.FAILED;
			case EInfoBannerStyleVariant.INFO:
				return EBadgeColorVariant.ONGOING;
			default:
				return badgeColorVariant;
		}
	}

	// Helper to determine text color based on variant
	function getTextColor() {
		switch (styleVariant) {
			case EInfoBannerStyleVariant.POSITIVE:
				return 'text-upOnly';
			case EInfoBannerStyleVariant.NEGATIVE:
				return 'text-rugged';
			case EInfoBannerStyleVariant.HIGHLIGHT:
				return 'text-filaMint';
			case EInfoBannerStyleVariant.WARNING:
				return 'text-yellowPaper';
			case EInfoBannerStyleVariant.INFO:
				return 'text-bluePaper';
			case EInfoBannerStyleVariant.RUGGED:
				return 'text-rugged';
			default:
				return 'text-gray-300';
		}
	}

	// Helper to determine background and border styles
	function getBackgroundStyles() {
		switch (styleVariant) {
			case EInfoBannerStyleVariant.POSITIVE:
				return 'border-upOnly bg-upOnly/5';
			case EInfoBannerStyleVariant.NEGATIVE:
				return 'border-rugged bg-rugged/10';
			case EInfoBannerStyleVariant.HIGHLIGHT:
				return 'border-filaMint bg-filaMint/5';
			case EInfoBannerStyleVariant.WARNING:
				return 'border-yellowPaper bg-yellowPaper/10';
			case EInfoBannerStyleVariant.INFO:
				return 'border-bluePaper bg-bluePaper/10';
			case EInfoBannerStyleVariant.RUGGED:
				return 'border-rugged bg-rugged/10';
			default:
				return 'border-gray-400 bg-gray-950';
		}
	}

	// Helper to determine position styles
	function getPositionStyles() {
		switch (positionVariant) {
			case EInfoBannerPositionVariant.TOP:
				return 'sticky top-0 z-50';
			case EInfoBannerPositionVariant.BOTTOM:
				return 'sticky bottom-0 z-50';
			default:
				return '';
		}
	}
</script>

{#if $showBanner}
	<div
		class={`flex w-full border mb-8 py-3 px-4 max-w-screen-2xl rounded-md mx-auto ${getBackgroundStyles()} ${getPositionStyles()}`}
	>
		<div class="flex flex-row items-center justify-between gap-4 flex-wrap w-full">
			<div class="flex flex-row items-center gap-3 flex-wrap">
				{#if title}
					<Badge label={title} colorVariant={getBadgeColorVariant()} class="py-1 px-2" />
				{/if}
				{#if description}
					<p class={getTextColor()}>
						{description}
					</p>
				{/if}
			</div>
			{#if dismissible}
				<Button styleVariant={getButtonStyleVariant()} on:click={acknowledgeBanner}>
					{buttonText}
				</Button>
			{/if}
		</div>
	</div>
{/if}
