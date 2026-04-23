import type { VList } from 'virtua/svelte';

type Event = {
  id: string;
  isNew: boolean;
  isPayloadVisible: boolean;
};

type EventsState = {
	events: Array<Event>;
  bufferedEvents: Array<Event>;
  shouldShowNewEventsAutomatically: boolean;
  virtualListRef: VList<Event> | null;
};

export const eventsState = $state<EventsState>({
  events: Array.from({ length: 100 }).map((_, index) => ({
    id: (100 - index).toString(),
    isNew: false,
    isPayloadVisible: false
  })),
  bufferedEvents: [],
  shouldShowNewEventsAutomatically: true,
  virtualListRef: null
});
