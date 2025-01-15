import { PUBLIC_HUB_WS_API } from '$env/static/public';

export class WebSocketClient {
	private socket: WebSocket | null = null;
	private url: string;
	private messageHandlers: Array<(message: unknown) => void> = [];
	private openHandlers: Array<() => void> = [];
	private isConnected: boolean = false;

	constructor(url: string) {
		this.url = url;
	}

	async connect() {
		if (this.isConnected) return;
		return new Promise<void>((resolve, reject) => {
			this.socket = new WebSocket(`${PUBLIC_HUB_WS_API}${this.url}`);

			this.socket.onopen = () => {
				console.log('WebSocket connected');
				this.isConnected = true;
				this.openHandlers.forEach((handler) => handler());
				resolve();
			};

			this.socket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);
					this.messageHandlers.forEach((handler) => handler(message));
				} catch (error) {
					console.error('Error parsing WebSocket message:', error);
				}
			};

			this.socket.onclose = () => {
				console.log('WebSocket disconnected');
				this.isConnected = false;
			};

			this.socket.onerror = (error) => {
				console.error('WebSocket error:', error);
				reject(error);
			};
		});
	}

	send(data: unknown) {
		if (this.socket && this.isConnected) {
			this.socket.send(JSON.stringify(data));
		} else {
			console.error('WebSocket is not connected');
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.isConnected = false;
		}
	}

	addMessageHandler(handler: (message: unknown) => void) {
		this.messageHandlers.push(handler);
	}

	removeMessageHandler(handler: (message: unknown) => void) {
		this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
	}

	onOpen(handler: () => void) {
		this.openHandlers.push(handler);
	}

	removeOnOpen(handler: () => void) {
		this.openHandlers = this.openHandlers.filter((h) => h !== handler);
	}
}
