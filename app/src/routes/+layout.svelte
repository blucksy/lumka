<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';

	import LiveMode from '../components/LiveMode.svelte';
	import Nav from '../components/Nav.svelte';
	import '../styles/app.css';

	export let data;

	const q = useQuery(data);

	$: ({ data: settings } = $q);
</script>

<!-- {#if $isPreviewing}
	<a
		href={`/preview/disable?redirect=${$page.url.pathname}`}
		class="inline-flex opacity-50 z-50 bottom-0 left-0 h-min fixed bg-black/10 px-3 items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 underline-offset-4 hover:underline transition"
	>
		<span>Preview enabled</span>
		<span class="opacity-60">Disable</span>
	</a>
{/if} -->

<Nav />

<slot />

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
