<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/utils/clickOutside';
	import ArtistView from './ArtistView.svelte';
	import ExhibitionView from './ExhibitionView.svelte';
	import MainView from './MainView.svelte';

	export let data;
	console.log(data);

	let open = '';

	function toggleTab(tab: string) {
		open = open === tab ? '' : tab;
	}

	let activeTab;

	$: activeTab =
		open ||
		($page.url.pathname === '/press'
			? 'press'
			: $page.url.pathname.includes('/exhibitions/')
				? 'exhibitions'
				: $page.url.pathname.includes('/artists')
					? 'artists'
					: 'main');

	console.log(activeTab);
</script>

<div
	class="fixed bg-lumka w-[468px] small-serif top-[6px] left-[18px] z-40"
	use:clickOutside={() => (open = '')}
>
	{#if open === 'main'}
		<MainView about={data?.settings.about} announcement={data?.settings.announcement} />
	{:else if open === 'exhibitions'}
		<ExhibitionView exhibitions={data?.exhibitions} />
	{:else if open === 'artists'}
		<ArtistView represented={data?.artists.represented} exhibited={data?.artists.exhibited} />
	{/if}
	<div
		class="flex *:flex-1 h-[27px]
					*:cursor-pointer *:transition-colors *:bg-black/0 *:duration-300
					*:data-[active=true]:italic *:data-[active=false]:bg-black/5"
	>
		<button on:click={() => toggleTab('main')} data-active={activeTab === 'main'}>LUmkA</button>
		<button on:click={() => toggleTab('exhibitions')} data-active={activeTab === 'exhibitions'}
			>Exhibitions</button
		>
		<button on:click={() => toggleTab('artists')} data-active={activeTab === 'artists'}
			>Artists</button
		>
		<a href="/press" class="" data-active={activeTab === 'press'} on:click={() => (open = '')}>
			<div class="flex h-full w-full items-center justify-center pointer-cursor">Press</div>
		</a>
	</div>
</div>
