type WebSocketConnectionStatus =
	'not_initiated' |
	'connecting' |
	'connected' |
	'failed';

type WebSocketState = {
	websocket: WebSocket | null;
	connectionStatus: WebSocketConnectionStatus;
	wasConnectedBefore: boolean;
	retryInSeconds: number;
	numberOfRetries: number;
};

export const webSocketState = $state<WebSocketState>({
	websocket: null,
	connectionStatus: 'not_initiated',
	wasConnectedBefore: false,
	retryInSeconds: 0,
	numberOfRetries: 0
});
