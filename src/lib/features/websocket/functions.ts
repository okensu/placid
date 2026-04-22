import { webSocketState } from './state.svelte';

export const connect = () => {
	webSocketState.websocket = new WebSocket('ws://example.com');

	webSocketState.websocket.addEventListener('load', () => {
		webSocketState.connectionStatus = 'connected';
	});

	webSocketState.websocket.addEventListener('close', () => {
		if (webSocketState.connectionStatus === 'connected') {
			webSocketState.connectionStatus = 'connection_lost';
		}
	});

	webSocketState.websocket.addEventListener('error', () => {
		if (webSocketState.connectionStatus === 'connected') {
			webSocketState.connectionStatus = 'connection_lost';
		}
	});
};
