<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import { webSocketState } from '$lib/features/websocket';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if webSocketState.connectionStatus === 'connected'}
  {@render children()}
{:else}
	<main class="flex flex-col min-h-full justify-center items-center gap-4 fixed top-0 left-0 right-0 bottom-0">
		{#if webSocketState.connectionStatus === 'connecting'}
			<span class="loading loading-spinner loading-xl"></span>
			{webSocketState.numberOfRetries === 0 ? 'Connecting' : 'Reconnecting'}...
		{:else if webSocketState.connectionStatus === 'failed'}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-error">
				<path fill-rule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
			</svg>
		  <span>
				Connection {webSocketState.wasConnectedBefore ? 'lost' : 'failed'}. Reconnecting in
				<span class="countdown">
					<span style="--value:{webSocketState.retryInSeconds};" aria-live="polite" aria-label="{webSocketState.retryInSeconds.toString()}">{webSocketState.retryInSeconds}</span>
				</span>
				seconds...
			</span>
		{/if}
	</main>
{/if}
