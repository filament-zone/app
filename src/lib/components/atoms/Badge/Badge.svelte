<script lang="ts">
	import { Typography } from '$lib/components';
	import { EBadgeColorVariant, EBadgeWidthVariant, type IBadgeProps } from '$lib/types';

	export let label: IBadgeProps['label'];
	export let colorVariant: IBadgeProps['colorVariant'] = EBadgeColorVariant.PRIMARY;
	export let widthVariant: IBadgeProps['widthVariant'] = EBadgeWidthVariant.FULL;

	function getColor(colorVariant: string): string {
		switch (colorVariant) {
			case 'primary':
				return 'var(--primary-white)';
			case 'secondary':
				return 'var(--default)';
			case 'success':
				return 'var(--default)';
			case 'danger':
				return 'var(--primary-white)';
			case 'warning':
				return 'var(--default)';
			case 'info':
				return 'var(--primary-white)';
			case 'light':
				return 'var(--default)';
			case 'dark':
				return 'var(--primary-white)';
			default:
				return 'var(--default)';
		}
	}
</script>

<div class={`badge ${$$props.class} ${colorVariant} ${widthVariant}`}>
	<Typography variant="caption" color={getColor(colorVariant)}>{label}</Typography>
</div>

<style lang="less">
	.badge {
		text-align: center;
		border-radius: 4px;
		padding: 4px 8px;

		&.primary {
			box-shadow: 0 0 0 0.1px var(--primary-white);
			background-color: var(--content1);
		}

		&.secondary {
			box-shadow: 0 0 0 0.1px var(--filaMint-300);
			background-color: var(--filaMint-100);
		}

		&.success {
			box-shadow: 0 0 0 0.1px var(--green-200);
			background-color: var(--green-100);
		}

		&.danger {
			box-shadow: 0 0 0 0.1px var(--red-200);
			background-color: var(--red-100);
		}

		&.warning {
			box-shadow: 0 0 0 0.1px var(--orange-200);
			background-color: var(--yellow);
		}

		&.info {
			box-shadow: 0 0 0 0.1px var(--blue-200);
			background-color: var(--blue-100);
		}

		&.light {
			box-shadow: 0 0 0 0.1px var(--filaMint-600);
			background-color: var(--foreground);
		}

		&.dark {
			box-shadow: 0 0 0 0.1px var(--filaMint-700);
			background-color: var(--background);
		}
	}
</style>
