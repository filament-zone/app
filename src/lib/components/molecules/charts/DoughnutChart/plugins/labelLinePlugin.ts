import { Chart } from 'chart.js';

export function createLabelLinePlugin(labelPadding: number = 5, hoverOffset: number = 5) {
	return {
		id: 'labelLinePlugin',
		afterDatasetDraw: (chart: Chart<'pie'>) => {
			const ctx = chart.ctx;
			const meta = chart.getDatasetMeta(0);
			const data = chart.data.datasets[0].data;

			ctx.save();

			data.forEach((value, index) => {
				const arc = meta.data[index];
				const isHovered = arc.active;
				const view = arc.getProps(['startAngle', 'endAngle', 'outerRadius', 'x', 'y'], true);
				const angle = (view.startAngle + view.endAngle) / 2;

				const outerRadius = view.outerRadius + (isHovered ? hoverOffset : hoverOffset);

				const x = view.x + Math.cos(angle) * outerRadius;
				const y = view.y + Math.sin(angle) * outerRadius;

				const labelX = x + Math.cos(angle) * (35 - labelPadding);
				const labelY = y + Math.sin(angle) * (35 - labelPadding);

				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(labelX, labelY);

				const colors = chart.data.datasets[0].backgroundColor as string[] | undefined[];
				if (colors && typeof colors[index] === 'string') {
					ctx.strokeStyle = colors[index];
				} else {
					ctx.strokeStyle = 'white';
				}

				ctx.lineWidth = 2;
				ctx.stroke();

				const finalLabelX = x + Math.cos(angle) * 35;
				const finalLabelY = y + Math.sin(angle) * 35;
				ctx.font = `normal 14px "fira-sans", serif`;
				ctx.fillStyle = 'white';
				ctx.textAlign = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'right' : 'left';
				ctx.fillText(`${value}K FILA`, finalLabelX, finalLabelY);
			});

			ctx.restore();
		}
	};
}
