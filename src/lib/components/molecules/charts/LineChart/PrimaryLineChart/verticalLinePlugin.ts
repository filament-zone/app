import type { Plugin, TooltipModel } from 'chart.js';

interface ExtendedTooltipModel extends TooltipModel<'line'> {
	_active?: Array<unknown>;
}

export const verticalLinePlugin: Plugin = {
	id: 'verticalLine',
	afterDraw(chart) {
		const tooltip = chart.tooltip as ExtendedTooltipModel;

		const ctx = chart.ctx;

		if (tooltip.getActiveElements().length) {
			const activeElements = tooltip.getActiveElements();
			const x = activeElements[0].element.x;

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x, chart.scales.y.top);
			ctx.lineTo(x, chart.scales.y.bottom);
			ctx.setLineDash([5, 5]);
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#2F2F31';
			ctx.stroke();
			ctx.restore();

			activeElements.forEach((activeElement) => {
				const datasetIndex = activeElement.datasetIndex;
				const index = activeElement.index;
				const meta = chart.getDatasetMeta(datasetIndex);

				if (!meta.hidden) {
					const point = meta.data[index];
					const pointRadius = point.options.radius || 5;

					ctx.save();
					ctx.beginPath();
					ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
					ctx.fillStyle = meta.controller.getStyle(index, true).backgroundColor;
					ctx.fill();
					ctx.lineWidth = 2;
					ctx.strokeStyle = meta.controller.getStyle(index, true).borderColor;
					ctx.stroke();
					ctx.restore();

					ctx.save();
					ctx.beginPath();
					ctx.arc(point.x, point.y, pointRadius - 1 < 0 ? 0 : pointRadius - 1, 0, Math.PI * 2);
					ctx.fillStyle = (chart.config.options?.scales?.y?.backgroundColor as string) ?? '#1D1D1F';
					ctx.fill();
					ctx.restore();
				}
			});
		}
	}
};
