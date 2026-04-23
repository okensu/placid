import { eventsState } from './state.svelte';

export const togglePayloadVisibility = (eventId: string) => {
  const event = eventsState.events.find((event) => event.id === eventId);
  if (event) {
    event.isPayloadVisible = !event.isPayloadVisible;
  }
};
