import type { EventType, IEventEmitter, Listener, OffEvent } from '$lib/types';

export class EventEmitter implements IEventEmitter {
	private listeners: Record<EventType, Listener[]> = {};

	on(eventType: EventType, listener: Listener): OffEvent {
		if (!this.listeners[eventType]) {
			this.listeners[eventType] = [];
		}
		this.listeners[eventType].push(listener);

		return () => this.off(eventType, listener);
	}

	off(eventType: EventType, listener: Listener): void {
		const callbackIndex = (this.listeners[eventType] || []).indexOf(listener);
		if (callbackIndex > -1) this.listeners[eventType].splice(callbackIndex, 1);
	}

	emit(eventType: EventType, payload?: unknown): void {
		(this.listeners[eventType] || []).forEach((listener) => listener(payload));
	}

	clearAll(): void {
		this.listeners = {};
	}
}
