import { eventsState } from '$lib/features/events/state.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  if (eventsState.bufferedEvents.length > 0 && eventsState.shouldShowNewEventsAutomatically) {
    const newEventIds = eventsState.bufferedEvents.map((event) => event.id);

    eventsState.events = [...eventsState.bufferedEvents, ...eventsState.events];
    eventsState.bufferedEvents = [];

    setTimeout(() => {
      for (const eventId of newEventIds) {
        const storedEvent = eventsState.events.find((item) => item.id === eventId);
        if (storedEvent) {
          storedEvent.isNew = false;
        }
      }
    }, 3000);
  }

	return {};
};
