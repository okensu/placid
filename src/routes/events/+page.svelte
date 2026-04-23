<script>
	import { VList } from 'virtua/svelte';
	import Event from '$lib/features/events/Event.svelte';

	let shouldShowNewEventsAutomatically = $state(true);

	let virtualListRef = $state();

	let events = $state(
		Array.from({ length: 100 }).map((_, i) => {
			const event = {
				id: 100 - i,
				isNew: false
			};

			return event;
		})
	);

	let newEvents = $state([]);

	$effect(() => {
		const interval = setInterval(() => {
			const event = {
				id: Date.now(),
				isNew: true
			};

			if (shouldShowNewEventsAutomatically) {
				events.unshift(event);

				setTimeout(() => {
					const storedEvent = events.find((item) => item.id === event.id);
					if (storedEvent) {
						storedEvent.isNew = false;
					}
				}, 3000);
			} else {
				newEvents.push(event);
			}
		}, 5000);

		return () => clearInterval(interval);
	});

	function loadNewEvents() {
		if (newEvents.length > 0) {
			const newEventIds = newEvents.map((event) => event.id);

		  events = [...newEvents, ...events];
			newEvents = [];

			setTimeout(() => {
				for (const eventId of newEventIds) {
					const storedEvent = events.find((item) => item.id === eventId);
					if (storedEvent) {
						storedEvent.isNew = false;
					}
				}
			}, 3000);
		}

		shouldShowNewEventsAutomatically = true;
		virtualListRef.scrollToIndex(0);
	}
</script>

<ul class="list">
	<VList
		bind:this={virtualListRef}
	  data={events}
		getKey={(event, i) => event.id}
		onscroll={(offset) => {
			if (offset === 0) {
				if (!shouldShowNewEventsAutomatically && newEvents.length === 0) {
					shouldShowNewEventsAutomatically = true;
				}
			} else {
				if (shouldShowNewEventsAutomatically) {
					shouldShowNewEventsAutomatically = false;
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

{#if !shouldShowNewEventsAutomatically}
	<button
	  onclick={() => loadNewEvents()}
	  class="btn absolute top-2 left-1/2 -translate-x-1/2 {(newEvents.length > 0) ? 'bg-info text-base-100' : ''}"
	>
		{#if newEvents.length > 0}
			Show {newEvents.length} new {newEvents.length === 1 ? 'event' : 'events'}
		{:else}
			Auto-refresh
		{/if}
	</button>
{/if}
