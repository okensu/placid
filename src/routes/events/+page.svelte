<script>
	import { WindowVirtualizer } from 'virtua/svelte';
	import Event from '$lib/features/events/Event.svelte';

	const events = $state(
		Array.from({ length: 100 }).map((_, i) => {
			const event = {
				id: 100 - i,
				isNew: false
			};

			return event;
		})
	);

	$effect(() => {
		const interval = setInterval(() => {
			const event = {
				id: events.length + 1,
				isNew: true
			};

			events.unshift(event);

			setTimeout(() => {
				event.isNew = false;
			}, 3000);
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<ul class="list">
	<WindowVirtualizer data={events} getKey={(event, i) => event.id}>
		{#snippet children(event, index)}
			<Event event={event} />
		{/snippet}
	</WindowVirtualizer>
</ul>
