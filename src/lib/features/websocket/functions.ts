import { webSocketState } from './state.svelte';

const attemptToConnect = async () => {
	webSocketState.websocket = new WebSocket('ws://example.com');

	webSocketState.connectionStatus = 'connecting';

	webSocketState.websocket.addEventListener('load', () => {
		webSocketState.connectionStatus = 'connected';
		webSocketState.wasConnectedBefore = true;
	});

	webSocketState.websocket.addEventListener('close', () => {
		if (webSocketState.connectionStatus !== 'failed') {
			webSocketState.connectionStatus = 'failed';
			retryInThreeSeconds();
		}
	});

	webSocketState.websocket.addEventListener('error', () => {
		if (webSocketState.connectionStatus !== 'failed') {
			webSocketState.connectionStatus = 'failed';
			retryInThreeSeconds();
		}
	});
};

const retryInThreeSeconds = () => {
	webSocketState.retryInSeconds = 3;

	const countdownInterval = setInterval(() => {
		webSocketState.retryInSeconds--;

		if (webSocketState.retryInSeconds === 0) {
			clearInterval(countdownInterval);

			setTimeout(() => retryNow(), 1000);
		}
	}, 1000);
};

const retryNow = () => {
	webSocketState.numberOfRetries++;
	attemptToConnect();
};

export const connect = async () => {
	await attemptToConnect();
};
