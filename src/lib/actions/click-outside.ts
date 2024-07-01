export type NodeType = HTMLElement | SVGElement;

export const clickOutside = (node: NodeType, allowedNodes?: (NodeType | null)[]) => {
	const handleClick = (event: MouseEvent) => {
		const target = event.target as Node;

		const clickedInsideAllowedNode = allowedNodes?.some((allowedNode) =>
			allowedNode?.contains(target)
		);

		if (!node.contains(target) && !clickedInsideAllowedNode) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('mousedown', handleClick);

	return {
		destroy() {
			document.removeEventListener('mousedown', handleClick);
		}
	};
};
