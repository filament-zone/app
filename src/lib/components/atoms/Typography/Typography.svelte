<script lang="ts">
	import type { ITypographyProps } from '$lib/types';

	export let variant: ITypographyProps['variant'] = 'h3';
	export let color: ITypographyProps['color'] = 'var(--primary-white)';
	export let styles: ITypographyProps['styles'] = '';
	export let className: ITypographyProps['className'] = '';

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
		overline: 'span'
	};
</script>

<svelte:element
	this={variant_to_tag_map[variant]}
	class={`${className} typography_${variant}`}
	style={`color: ${color}; ${styles}`}
>
	<slot />
</svelte:element>

<style lang="less">
	@import '$lib/styles/layout.less';

	.typography_h1 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;

		@media @size_sm {
			font-size: 36px;
		}

		@media @size_md {
			font-size: 48px;
		}

		@media @size_lg {
			font-size: 56px;
		}

		@media @size_xl {
			font-size: 64px;
		}

		@media @size_2xl {
			font-size: 72px;
		}

		@media @size_3xl {
			font-size: 80px;
		}
	}

	.typography_h2 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 28px;
		font-weight: 600;
		line-height: 1.3;

		@media @size_sm {
			font-size: 32px;
		}

		@media @size_md {
			font-size: 40px;
		}

		@media @size_lg {
			font-size: 48px;
		}

		@media @size_xl {
			font-size: 56px;
		}

		@media @size_2xl {
			font-size: 64px;
		}

		@media @size_3xl {
			font-size: 72px;
		}
	}

	.typography_h3 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 24px;
		font-weight: 500;
		line-height: 1.4;

		@media @size_sm {
			font-size: 28px;
		}

		@media @size_md {
			font-size: 32px;
		}

		@media @size_lg {
			font-size: 40px;
		}

		@media @size_xl {
			font-size: 48px;
		}

		@media @size_2xl {
			font-size: 56px;
		}

		@media @size_3xl {
			font-size: 64px;
		}
	}

	.typography_h4 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.5;

		@media @size_sm {
			font-size: 24px;
		}

		@media @size_md {
			font-size: 28px;
		}

		@media @size_lg {
			font-size: 32px;
		}

		@media @size_xl {
			font-size: 36px;
		}

		@media @size_2xl {
			font-size: 40px;
		}

		@media @size_3xl {
			font-size: 44px;
		}
	}

	.typography_h5 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.6;

		@media @size_sm {
			font-size: 20px;
		}

		@media @size_md {
			font-size: 24px;
		}

		@media @size_lg {
			font-size: 28px;
		}

		@media @size_xl {
			font-size: 32px;
		}

		@media @size_2xl {
			font-size: 36px;
		}

		@media @size_3xl {
			font-size: 40px;
		}
	}

	.typography_h6 {
		font-family: 'ff-meta-serif-web-pro', serif;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.7;

		@media @size_sm {
			font-size: 14px;
		}

		@media @size_md {
			font-size: 16px;
		}

		@media @size_lg {
			font-size: 18px;
		}

		@media @size_xl {
			font-size: 24px;
		}

		@media @size_2xl {
			font-size: 28px;
		}

		@media @size_3xl {
			font-size: 32px;
		}
	}

	.typography_subtitle1 {
		font-family: 'fira-sans', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.7;

		@media @size_sm {
			font-size: 18px;
		}

		@media @size_md {
			font-size: 20px;
		}

		@media @size_lg {
			font-size: 24px;
		}

		@media @size_xl {
			font-size: 28px;
		}

		@media @size_2xl {
			font-size: 32px;
		}

		@media @size_3xl {
			font-size: 36px;
		}
	}

	.typography_subtitle2 {
		font-family: 'fira-sans', sans-serif;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.7;

		@media @size_sm {
			font-size: 16px;
		}

		@media @size_md {
			font-size: 18px;
		}

		@media @size_lg {
			font-size: 20px;
		}

		@media @size_xl {
			font-size: 24px;
		}

		@media @size_2xl {
			font-size: 28px;
		}

		@media @size_3xl {
			font-size: 32px;
		}
	}

	.typography_body1 {
		font-family: 'fira-sans', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 18px;
		}

		@media @size_md {
			font-size: 20px;
		}

		@media @size_lg {
			font-size: 24px;
		}

		@media @size_xl {
			font-size: 28px;
		}

		@media @size_2xl {
			font-size: 32px;
		}

		@media @size_3xl {
			font-size: 36px;
		}
	}

	.typography_body2 {
		font-family: 'fira-sans', sans-serif;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 16px;
		}

		@media @size_md {
			font-size: 18px;
		}

		@media @size_lg {
			font-size: 20px;
		}

		@media @size_xl {
			font-size: 24px;
		}

		@media @size_2xl {
			font-size: 28px;
		}

		@media @size_3xl {
			font-size: 32px;
		}
	}

	.typography_caption {
		font-family: 'fira-sans', sans-serif;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 14px;
		}

		@media @size_md {
			font-size: 16px;
		}

		@media @size_lg {
			font-size: 18px;
		}

		@media @size_xl {
			font-size: 20px;
		}

		@media @size_2xl {
			font-size: 22px;
		}

		@media @size_3xl {
			font-size: 24px;
		}
	}

	.typography_overline {
		font-family: 'fira-sans', sans-serif;
		font-size: 10px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 12px;
		}

		@media @size_md {
			font-size: 14px;
		}

		@media @size_lg {
			font-size: 16px;
		}

		@media @size_xl {
			font-size: 18px;
		}

		@media @size_2xl {
			font-size: 20px;
		}

		@media @size_3xl {
			font-size: 22px;
		}
	}
</style>
