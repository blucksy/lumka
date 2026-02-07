<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import MobileMenu from '../components/MobileMenu.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { useQuery } from '@sanity/svelte-loader';

	import LiveMode from '../components/LiveMode.svelte';
	import '../app.css';

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

<div class="px-page">
	<header class="px-page flex flex-row fixed top-0 left-0 w-screen z-40 justify-between py-7.5">
		<h1 class="text-lg trim-md md:type-lg md:trim-lg z-40">
			<a href="/">LUmkA</a>
		</h1>
		<div class="md:flex flex-row gap-20 hidden">
			<a class="type-lg trim-lg" href="/exhibitions">Index</a>
			<a class="type-lg trim-lg" href="/info">Info</a>
			<a class="type-lg trim-lg" href="https://substack.com/home" target="_blank">Journal</a>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
