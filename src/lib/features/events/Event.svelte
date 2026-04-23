<script>
	import { Highlight } from 'svelte-highlight';
	import { json } from 'svelte-highlight/languages';
	import genemetricsLogo from '$lib/assets/genemetrics.png';

	let { event } = $props();

	let isUnknownEvent = false;
	let isPayloadVisible = $state(false);
</script>

<style>
  @keyframes event-new-appear {
		0% {background: color-mix(in oklab, #393a34 75%, #000 25%); height: 0; padding: 0 1rem;}
		20% {background: color-mix(in oklab, #393a34 75%, #000 25%); height: auto; padding: 1rem;}
		100% {background: #000;}
	}

	.event {
		interpolate-size: allow-keywords;
		background: #000;
	}

	.event-new {
		animation: event-new-appear 3s normal forwards ease-out;
	}
</style>

<li class="list-row border-b border-neutral rounded-none event" class:event-new={event.isNew}>
	<div><img class="size-10 rounded-box" src={genemetricsLogo} alt="Icon" /></div>
	<div>
		<div>GeneMetrics • ClickUp</div>
		<div class="text-xs opacity-80">taskCommentPosted #{event.id}</div>
		<div class="collapse text-xs" class:collapse-open={isUnknownEvent || isPayloadVisible} class:collapse-close={!isUnknownEvent && !isPayloadVisible}>
			<div class="collapse-content transition-all p-0" class:mt-4={isUnknownEvent || isPayloadVisible}>
				<Highlight language={json} code={'{"hello": "world"}'} />
			</div>
		</div>
	</div>
	<button onclick={() => isPayloadVisible = !isPayloadVisible} class="btn btn-square btn-ghost {isPayloadVisible ? 'bg-primary text-base-100' : ''}" class:hidden={isUnknownEvent} aria-label="Payload">
		<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
		</svg>
	</button>
</li>
