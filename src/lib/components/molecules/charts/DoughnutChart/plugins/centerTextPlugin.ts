import { Chart } from 'chart.js';

export function createCenterTextPlugin(centerText: string[] | undefined) {
	return {
		id: 'centerTextPlugin',
		afterDraw: (chart: Chart<'pie'>) => {
			const ctx = chart.ctx;
			const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
			const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

			ctx.save();

			ctx.font = `bold 16px "ff-meta-serif-web-pro", serif`;
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillStyle = 'white';
			const firstLine = centerText?.[0] || '';
			ctx.fillText(firstLine, centerX, centerY - 10);

			ctx.font = `normal 14px "ff-meta-serif-web-pro", serif`;
			const secondLine = centerText?.[1] || '';
			ctx.fillText(secondLine, centerX, centerY + 10);

			ctx.restore();
		}
	};
}
