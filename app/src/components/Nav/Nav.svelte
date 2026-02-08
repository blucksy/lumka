<script lang="ts">
	import { page } from '$app/state';
	import { clickOutside } from '$lib/utils/clickOutside';
	import Artists from './Artists.svelte';
	import Exhibitions from './Exhibitions.svelte';
	import Main from './Main.svelte';

	export let data;
	console.log(data);

	let open = '';

	function toggleTab(tab: string) {
		open = open === tab ? '' : tab;
	}

	let activeTab;

	$: activeTab =
		open ||
		(page.route.id === '/press'
			? 'press'
			: page.route.id?.includes('/exhibitions/')
				? 'exhibitions'
				: page.route.id?.includes('/artists')
					? 'artists'
					: 'main');

	console.log(activeTab);
</script>

<div
	class="fixed bg-lumka w-[468px] small-serif top-[6px] left-[18px]"
	use:clickOutside={() => (open = '')}
>
	{#if open === 'main'}
		<Main about={data?.settings.about} announcement={data?.settings.announcement} />
	{:else if open === 'exhibitions'}
		<Exhibitions exhibitions={data?.exhibitions} />
	{:else if open === 'artists'}
		<Artists represented={data?.artists.represented} exhibited={data?.artists.exhibited} />
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
		<div
			class="flex h-full w-full items-center justify-center"
			data-active={activeTab === 'press'}
			on:click={() => (open = '')}
		>
			<a href="/press"> Press</a>
		</div>
	</div>
</div>
