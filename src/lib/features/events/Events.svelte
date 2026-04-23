<script>
	import { VList } from 'virtua/svelte';
	import Event from '$lib/features/events/Event.svelte';
  import { eventsState } from './state.svelte';
  import { page } from '$app/state';

	$effect(() => {
		const interval = setInterval(() => {
			const event = {
				id: Date.now().toString(),
				isNew: true,
				isPayloadVisible: false
			};

			if (eventsState.shouldShowNewEventsAutomatically && page.url.pathname === '/events') {
				eventsState.events.unshift(event);

				setTimeout(() => {
					const storedEvent = eventsState.events.find((item) => item.id === event.id);
					if (storedEvent) {
						storedEvent.isNew = false;
					}
				}, 3000);
			} else {
				eventsState.bufferedEvents.push(event);
			}
		}, 5000);

		return () => clearInterval(interval);
	});

	function loadNewEvents() {
		if (eventsState.bufferedEvents.length > 0) {
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

		eventsState.shouldShowNewEventsAutomatically = true;
		eventsState.virtualListRef?.scrollToIndex(0);
	}
</script>

<ul class="list">
	<VList
		bind:this={eventsState.virtualListRef}
	  data={eventsState.events}
		getKey={(event, i) => event.id}
		onscroll={(offset) => {
			if (offset === 0) {
				if (!eventsState.shouldShowNewEventsAutomatically && eventsState.bufferedEvents.length === 0) {
					eventsState.shouldShowNewEventsAutomatically = true;
				}
			} else {
				if (eventsState.shouldShowNewEventsAutomatically) {
					eventsState.shouldShowNewEventsAutomatically = false;
				}
			}
		}}
		style="min-height: 100vh;"
	>
		{#snippet children(event, index)}
			<Event event={event} />
		{/snippet}
	</VList>
</ul>

{#if !eventsState.shouldShowNewEventsAutomatically}
	<button
	  onclick={() => loadNewEvents()}
	  class="btn absolute top-2 left-1/2 -translate-x-1/2 text-sm {(eventsState.bufferedEvents.length > 0) ? 'btn-info text-base-100' : ''}"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
			<path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
		</svg>
		{#if eventsState.bufferedEvents.length > 0}
			<span>
				Show
				<span class="countdown text-base-100">
					<span style="--value:{eventsState.bufferedEvents.length};" aria-live="polite" aria-label="{eventsState.bufferedEvents.length.toString()}">{eventsState.bufferedEvents.length}</span>
				</span>
				new {eventsState.bufferedEvents.length === 1 ? 'event' : 'events'}
			</span>
		{:else}
			Auto-refresh
		{/if}
	</button>
{/if}
