export const throttle = (func: (...args: unknown[]) => void, limit: number) => {
	let inThrottle: boolean;
	return function (this: unknown, ...args: unknown[]): void {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};

export const debounce = (func: (...args: unknown[]) => void, wait: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	return function (this: unknown, ...args: unknown[]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
};
