export const generateLabels = () => {
	const labels: string[] = [];

	for (let i = 14; i <= 31; i++) {
		labels.push(i.toString().padStart(2, '0'));
	}

	for (let i = 1; i <= 12; i++) {
		labels.push(i.toString().padStart(2, '0'));
	}

	return labels;
};

export const primaryChartLabelsMock = generateLabels();
export const primaryChartDataMock = () => [...Array(31)].map(() => Math.random() * 100);
