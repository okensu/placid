<script>
	import { WindowVirtualizer } from 'virtua/svelte';
	import Event from '$lib/features/events/Event.svelte';

	const sizes = [20, 40, 180, 77];

	const data = Array.from({ length: 100 }).map((_, i) => sizes[i % 4] );
</script>

<div class="list">
	<WindowVirtualizer {data} getKey={(_, i) => i}>
		{#snippet children(item, index)}
			<Event />
		{/snippet}
	</WindowVirtualizer>
</div>
