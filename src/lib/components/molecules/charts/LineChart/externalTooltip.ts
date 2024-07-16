import type { Chart, TooltipModel } from 'chart.js';

const getOrCreateTooltip = (chart: Chart): HTMLDivElement => {
	let tooltipEl = chart.canvas.parentNode?.querySelector('div') as HTMLDivElement | null;

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.style.background = '#1D1D1F';
		tooltipEl.style.borderRadius = '4px';
		tooltipEl.style.border = '1px solid #2F2F31';
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all .1s ease';
		tooltipEl.style.padding = '10px';

		const table = document.createElement('table');
		table.style.margin = '0px';

		tooltipEl.appendChild(table);
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

export const externalTooltipHandler = (context: {
	chart: Chart;
	tooltip: TooltipModel<'line'>;
}) => {
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map((b) => b.lines);

		const tableHead = document.createElement('thead');

		titleLines.forEach((title) => {
			const tr = document.createElement('tr');
			tr.style.borderWidth = '0';
			tr.style.textAlign = 'left';
			tr.style.color = '#fff';
			tr.style.fontSize = '14px';
			tr.style.fontWeight = '800';

			const th = document.createElement('th');
			th.style.borderWidth = '0';
			const text = document.createTextNode(title);

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});

		const tableBody = document.createElement('tbody');
		bodyLines.forEach((body, i) => {
			body.forEach((bodyItem: string) => {
				const colors = tooltip.labelColors[i];

				const div = document.createElement('div');
				div.style.background = colors.backgroundColor as string;
				div.style.borderColor = colors.borderColor as string;
				div.style.borderWidth = '2px';
				div.style.marginRight = '10px';
				div.style.height = '0.875rem';
				div.style.width = '1px';
				div.style.display = 'inline-block';
				div.style.borderRadius = '4px';

				const tr = document.createElement('tr');

				const td = document.createElement('td');
				td.style.width = '130px';
				td.style.display = 'flex';
				td.style.alignItems = 'center';
				td.style.flexDirection = 'row';

				const valueName = document.createElement('span');
				valueName.innerText = bodyItem.split(':')[0];
				valueName.style.color = '#ADADAE';

				const value = document.createElement('span');
				value.innerText = bodyItem.split(':')[1];
				value.style.marginLeft = 'auto';
				value.style.color = '#fff';

				td.appendChild(div);
				td.appendChild(valueName);
				td.appendChild(value);

				tr.appendChild(td);
				tableBody.appendChild(tr);
			});
		});

		const tableRoot = tooltipEl.querySelector('table');

		while (tableRoot?.firstChild) {
			tableRoot.firstChild.remove();
		}

		tableRoot?.appendChild(tableHead);
		tableRoot?.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	tooltipEl.style.opacity = '1';
	tooltipEl.style.left = `${positionX + tooltip.caretX + 100}px`;
	tooltipEl.style.top = `${positionY + tooltip.caretY - 100}px`;
	tooltipEl.style.font = '';
};
