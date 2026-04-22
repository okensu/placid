import { connect } from '$lib/features/websocket';
import type { ClientInit } from '@sveltejs/kit';

export const init: ClientInit = () => {
	connect();
};
