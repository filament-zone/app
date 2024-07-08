export const writeToLocalStorage = (key: string, data: unknown) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(data));
	} else {
		console.error(`Can't set key ${key}! window or localStorage is not defined.`);
	}
};

export const readFromLocalStorage = <T>(key: string): T | null => {
	if (typeof window === 'undefined') return null;

	const data = localStorage.getItem(key);

	return data ? JSON.parse(data) : null;
};

export const removeFromLocalStorage = (key: string) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key);
	} else {
		console.error(`Can't remove key ${key}! window or localStorage is not defined.`);
	}
};
