export type Listener = (data?: unknown) => void;

export type EventType = string;

export type OffEvent = () => void;

export interface IEventEmitter {
	on: (eventType: EventType, listener: Listener) => OffEvent;
	off: (eventType: EventType, listener: Listener) => void;
	emit: (eventType: EventType, payload?: unknown) => void;
	clearAll: () => void;
}
