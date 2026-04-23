<script>
	import { WindowVirtualizer } from 'virtua/svelte';
	import Event from '$lib/features/events/Event.svelte';

	const events = $state(Array.from({ length: 100 }).map((_, i) => 100 - i ));

	$effect(() => {
		const interval = setInterval(() => {
			events.unshift(events.length + 1);
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<ul class="list">
	<WindowVirtualizer data={events} getKey={(item, i) => item}>
		{#snippet children(item, index)}
			<Event />
		{/snippet}
	</WindowVirtualizer>
</ul>
