export const stylesObjectToString = (styles?: Record<string, unknown>) =>
	styles &&
	Object.entries(styles)
		.map(([key, value]) => {
			// Convert camelCase to kebab-case
			const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
			return `${kebabKey}: ${value}`;
		})
		.join('; ');
