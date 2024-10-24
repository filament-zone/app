<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ITypographyProps } from '$lib/types';

	export let variant: ITypographyProps['variant'] = 'h3';
	export let color: ITypographyProps['color'] = 'var(--primary-white)';
	export let styles: ITypographyProps['styles'] = '';
	export let dataTestId: ITypographyProps['dataTestId'] = '';
	export let allowHover: boolean = false;

	const variant_to_tag_map: Record<ITypographyProps['variant'], string> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6',
		subtitle1: 'h6',
		subtitle2: 'h6',
		body1: 'p',
		body2: 'p',
		caption: 'span',
		overline: 'span',
		labelSmall: 'span',
		button: 'span'
	};

	const dispatch = createEventDispatcher();

	const forwardEvent = (event: Event) => {
		dispatch(event.type, event);
	};
</script>

<svelte:element
	this={variant_to_tag_map[variant]}
	class={`typography_${variant} ${allowHover ? 'allow-hover' : ''} ${$$props.class}`}
	style={`color: ${color}; ${styles}`}
	on:click={forwardEvent}
	aria-hidden="true"
	data-testId={dataTestId}
>
	<slot />
</svelte:element>

<style lang="less">
	@import '$lib/styles/layout.less';

	.typography_h1 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 26px;
		font-weight: 700;
		line-height: 1.2;

		@media @size_sm {
			font-size: 29px;
		}

		@media @size_md {
			font-size: 38px;
		}

		@media @size_lg {
			font-size: 45px;
		}

		@media @size_xl {
			font-size: 51px;
		}

		@media @size_2xl {
			font-size: 58px;
		}
	}

	.typography_h2 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 22px;
		font-weight: 600;
		line-height: 1.3;

		@media @size_sm {
			font-size: 26px;
		}

		@media @size_md {
			font-size: 32px;
		}

		@media @size_lg {
			font-size: 38px;
		}

		@media @size_xl {
			font-size: 45px;
		}

		@media @size_2xl {
			font-size: 51px;
		}
	}

	.typography_h3 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 19px;
		font-weight: 500;
		line-height: 1.4;

		@media @size_sm {
			font-size: 22px;
		}

		@media @size_md {
			font-size: 26px;
		}

		@media @size_lg {
			font-size: 32px;
		}

		@media @size_xl {
			font-size: 38px;
		}

		@media @size_2xl {
			font-size: 45px;
		}
	}

	.typography_h4 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 16px;
		font-weight: 500;
		line-height: 1.5;

		@media @size_sm {
			font-size: 19px;
		}

		@media @size_md {
			font-size: 23px;
		}

		@media @size_lg {
			font-size: 24px;
		}

		@media @size_xl {
			font-size: 25px;
		}

		@media @size_2xl {
			font-size: 26px;
		}
	}

	.typography_h5 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;

		@media @size_sm {
			font-size: 16px;
		}

		@media @size_md {
			font-size: 19px;
		}

		@media @size_lg {
			font-size: 22px;
		}

		@media @size_xl {
			font-size: 18px;
		}

		@media @size_2xl {
			font-size: 18px;
		}
	}

	.typography_h6 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 10px;
		font-weight: 400;
		--size: 16px;

		@media @size_sm {
			font-size: var(--size);
		}

		@media @size_md {
			font-size: var(--size);
		}

		@media @size_lg {
			font-size: var(--size);
		}

		@media @size_xl {
			font-size: var(--size);
		}

		@media @size_2xl {
			font-size: var(--size);
		}

		@media @size_3xl {
			font-size: var(--size);
		}
	}

	.typography_subtitle1 {
		font-family: 'fira-sans', sans-serif;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.7;

		@media @size_sm {
			font-size: 14px;
		}

		@media @size_md {
			font-size: 16px;
		}

		@media @size_lg {
			font-size: 19px;
		}

		@media @size_xl {
			font-size: 22px;
		}

		@media @size_2xl {
			font-size: 26px;
		}
	}

	.typography_subtitle2 {
		font-family: 'fira-sans', sans-serif;
		font-size: 11px;
		font-weight: 400;
		line-height: 1.7;

		@media @size_sm {
			font-size: 13px;
		}

		@media @size_md {
			font-size: 14px;
		}

		@media @size_lg {
			font-size: 16px;
		}

		@media @size_xl {
			font-size: 19px;
		}

		@media @size_2xl {
			font-size: 22px;
		}
	}

	.typography_body1 {
		font-family: 'fira-sans', sans-serif;
		font-size: 13px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 14px;
		}

		@media @size_md {
			font-size: 16px;
		}

		@media @size_lg {
			font-size: 19px;
		}

		@media @size_xl {
			font-size: 22px;
		}

		@media @size_2xl {
			font-size: 26px;
		}
	}

	.typography_body2 {
		font-family: 'fira-sans', sans-serif;
		font-size: 11px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 13px;
		}

		@media @size_md {
			font-size: 14px;
		}

		@media @size_lg {
			font-size: 16px;
		}

		@media @size_xl {
			font-size: 19px;
		}

		@media @size_2xl {
			font-size: 22px;
		}
	}

	.typography_caption {
		font-family: 'fira-sans', sans-serif;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 13px;
		}

		@media @size_md {
			font-size: 13px;
		}

		@media @size_lg {
			font-size: 14px;
		}

		@media @size_xl {
			font-size: 15px;
		}

		@media @size_2xl {
			font-size: 15px;
		}
	}

	.typography_overline {
		font-family: var(--primary-font);
		font-size: 8px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 13px;
		}

		@media @size_md {
			font-size: 13px;
		}

		@media @size_lg {
			font-size: 14px;
		}

		@media @size_xl {
			font-size: 15px;
		}

		@media @size_2xl {
			font-size: 15px;
		}
	}

	.typography_labelSmall {
		font-family: 'fira-sans', sans-serif;
		font-size: 6px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 8px;
		}

		@media @size_md {
			font-size: 8px;
		}

		@media @size_lg {
			font-size: 12px;
		}

		@media @size_xl {
			font-size: 12px;
		}

		@media @size_2xl {
			font-size: 12px;
		}
	}

	.allow-hover {
		transition: color 0.3s ease;

		&:hover {
			color: var(--filaMint);
		}
	}
</style>
