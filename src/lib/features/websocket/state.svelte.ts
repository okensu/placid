type WebSocketConnectionStatus =
	'not_connected' |
	'connecting' |
	'connected' |
	'connection_lost' |
	'connection_failed' |
	'retrying';

type WebSocketState = {
	websocket: WebSocket | null;
	connectionStatus: WebSocketConnectionStatus;
};

export const webSocketState = $state<WebSocketState>({
	websocket: null,
	connectionStatus: 'not_connected'
});
