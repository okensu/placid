<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import devibeans from 'svelte-highlight/styles/devibeans';
    import Events from '$lib/features/events/Events.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- TODO: Implement a custom theme for svelte-highlight if possible -->
	{@html devibeans}
</svelte:head>

<!-- {#if webSocketState.connectionStatus === 'connected'} -->
  
<!-- {:else}
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
{/if} -->

<div class="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content">
    <nav class="navbar w-full border-b border-neutral p-4 lg:hidden">
      <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div class="px-4">Inbox</div>
    </nav>
    <div class="relative">
			<!-- {@render children()} -->

      <div class:hidden={page.url.pathname !== '/events'}>
        <Events />
      </div>
    </div>
  </div>

  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex min-h-full flex-col items-start bg-base-200 border-r border-neutral is-drawer-close:w-16 is-drawer-open:w-64">
      <ul class="menu w-full grow">
        <li>
          <button onclick={() => goto('/')} class="is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:tooltip-primary {(page.url.pathname === '/') ? 'bg-primary text-base-100' : ''}" data-tip="Inbox">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <span class="is-drawer-close:hidden">Inbox</span>
          </button>
        </li>

        <li>
          <button onclick={() => goto('/events')} class="is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:tooltip-info {(page.url.pathname === '/events') ? 'bg-info text-base-100' : ''}" data-tip="Events">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            <span class="is-drawer-close:hidden">Events</span>
          </button>
        </li>

        <li>
          <button onclick={() => goto('/terminal')} class="is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:tooltip-secondary {(page.url.pathname === '/terminal') ? 'bg-secondary text-base-100' : ''}" data-tip="Terminal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span class="is-drawer-close:hidden">Terminal</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
