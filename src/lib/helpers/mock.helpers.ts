export const createSmoothRandomData = (
	length: number,
	min: number,
	max: number,
	fluctuation = 5
) => {
	const data = [Math.floor(Math.random() * (max - min + 1)) + min];
	for (let i = 1; i < length; i++) {
		const previous = data[i - 1];
		const change = Math.floor(Math.random() * (fluctuation * 2 + 1)) - fluctuation;
		let newValue = previous + change;

		newValue = Math.min(Math.max(newValue, min), max);
		data.push(newValue);
	}
	return data;
};

export const generateDateLabels = (from: string, to: string): string[] => {
	const startDate = new Date(from);
	const endDate = new Date(to);
	const dateArray: string[] = [];

	for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
		dateArray.push(
			date
				.toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				})
				.replace(/ /g, ' ')
		);
	}

	return dateArray;
};
