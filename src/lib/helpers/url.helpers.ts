export const replaceUrlParams = (url: string, params: Record<string, string>): string =>
	Object.keys(params).reduce((acum, param) => acum.replace(`:${param}`, params[param]), url);
