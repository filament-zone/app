<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { ITypographyProps } from '$lib/types';

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
		button: 'span',
		badge: 'span',
		toggle: 'span',
		cardDate: 'span'
	};

	const dispatch = createEventDispatcher();

	const forwardEvent = (event: Event) => {
		dispatch(event.type, event);
	};

	let {
		children,
		variant = 'h3',
		color = 'var(--primary-white)',
		styles = '',
		dataTestId = '',
		allowHover = false,
		classNames
	}: ITypographyProps = $props();
</script>

<svelte:element
	this={variant_to_tag_map[variant]}
	class={`typography_${variant} ${allowHover ? 'allow-hover' : ''} ${classNames}`}
	style={`color: ${color}; ${styles}`}
	onclick={forwardEvent}
	aria-hidden="true"
	data-testId={dataTestId}
>
	{@render children?.()}
</svelte:element>

<style lang="less">
	@import '$lib/styles/layout.less';

	.typography_h1 {
		font-family: var(--primary-font);
		font-size: 26px;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.05rem;

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
		font-family: var(--primary-font);
		font-size: 22px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: 0.05rem;

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
		font-family: var(--primary-font);
		font-size: 19px;
		font-weight: 500;
		line-height: 1.4;
		letter-spacing: 0.05rem;

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
		font-family: var(--primary-font);
		font-size: 16px;
		font-weight: 500;
		line-height: 1.5;
		letter-spacing: 0.05rem;

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
		font-family: var(--primary-font);
		font-size: 18px;
		font-weight: 600;
		line-height: 1.6;
		letter-spacing: 0.05rem;

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
		font-family: var(--primary-font);
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0.07rem;
		--size: 16px;
		width: fit-content;
		display: inline-flex;

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
		font-family: var(--secondary-font);
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
		font-family: var(--secondary-font);
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
		font-family: var(--secondary-font);
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
		font-family: var(--secondary-font);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;

		@media @size_sm {
			font-size: 16px;
		}

		@media @size_md {
			font-size: 16px;
		}

		@media @size_lg {
			font-size: 15px;
		}

		@media @size_xl {
			font-size: 18px;
		}

		@media @size_2xl {
			font-size: 20px;
		}
	}

	.typography_caption {
		font-family: var(--secondary-font);
		font-size: 16px;
		font-weight: 300;
		line-height: 1.5;
		letter-spacing: 0.05rem;
		opacity: 1;
		text-align: left;

		@media @size_sm {
			font-size: 12px;
		}

		@media @size_md {
			font-size: 13px;
		}

		@media @size_lg {
			font-size: 13px;
		}

		@media @size_xl {
			font-size: 14px;
		}

		@media @size_2xl {
			font-size: 14px;
		}
	}

	.typography_overline {
		font-family: var(--primary-font);
		font-size: 14px;
		font-weight: 300;
		line-height: 1.5;

		@media @size_sm {
			font-size: 14px;
		}

		@media @size_md {
			font-size: 14px;
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

	.typography_cardDate {
		font-family: var(--primary-font);
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.05rem;
		@media @size_sm {
			font-size: 12px;
		}

		@media @size_md {
			font-size: 14px;
		}

		@media @size_lg {
			font-size: 15px;
		}
	}

	.typography_labelSmall {
		font-family: var(--secondary-font);
		font-size: 9px;
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

	.typography_badge {
		font-family: var(--primary-font);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.06rem;
	}

	.typography_badge_number {
		font-family: var(--secondary-font);
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.05rem;
	}

	.typography_toggle {
		font-family: var(--primary-font);
		font-size: 15px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: 0.05rem;
	}

	.allow-hover {
		transition: color 0.3s ease;

		&:hover {
			color: var(--filaMint);
		}
	}
</style>
