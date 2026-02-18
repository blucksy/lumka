<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { onDestroy, onMount } from 'svelte';
	import ArtistView from './ArtistView.svelte';
	import ExhibitionView from './ExhibitionView.svelte';
	import MainView from './MainView.svelte';
	import NewsletterView from './NewsletterView.svelte';

	export let data;

	let open = '';

	let navEl: HTMLElement;
	let footerEl: HTMLElement;

	function checkOverlap() {
		if (!navEl || !footerEl) return;

		console.log('checking overlap', {
			nav: navEl.getBoundingClientRect(),
			footer: footerEl.getBoundingClientRect()
		});

		const navRect = navEl.getBoundingClientRect();
		const footerRect = footerEl.getBoundingClientRect();

		const isOverlapping = navRect.bottom > footerRect.top && navRect.top < footerRect.bottom;

		navEl.setAttribute('aria-hidden', isOverlapping ? 'true' : 'false');
	}

	function recalcHeight() {
		if (open) {
			const el = document.getElementById(`nav-${open}`);
			document.getElementById('nav-holder').style.height = el ? el.scrollHeight + 'px' : '0px';

			console.log('recalc', el ? el.scrollHeight : 'no element');
		} else {
			document.getElementById('nav-holder').style.height = '0px';
		}
	}

	function toggleTab(tab: string) {
		// remove current focus
		document.activeElement?.blur();

		open = open === tab ? '' : tab;
		if (open) {
			recalcHeight();
		}
	}

	$: if (!open && browser) {
		recalcHeight();
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

	// --- CLOSE ON PAGE CHANGE ---
	const unsubscribePage = page.subscribe(() => {
		if ($page.url.pathname !== '/') {
			open = '';
		}
	});

	// --- CLOSE ON SCROLL ONLY WHEN OPEN ---
	let handleScroll: () => void;

	$: {
		if (open) {
			handleScroll = () => (open = '');
			window.addEventListener('scroll', handleScroll, { passive: true });
		} else if (handleScroll) {
			window.removeEventListener('scroll', handleScroll);
			handleScroll = null;
		}
	}

	onDestroy(() => {
		unsubscribePage();
		if (handleScroll) window.removeEventListener('scroll', handleScroll);
	});

	onMount(() => {
		navEl = document.getElementById('nav');
		footerEl = document.getElementById('footer');

		checkOverlap();
		window.addEventListener('resize', checkOverlap);
		window.addEventListener('scroll', checkOverlap, { passive: true });

		return () => {
			window.removeEventListener('resize', checkOverlap);
			window.removeEventListener('scroll', checkOverlap);
		};
	});
</script>

<div
	id="nav"
	class="fixed opacity-98 duration-300 aria-hidden:opacity-0 aria-hidden:pointer-events-none anim-opacity bg-lumka bottom-[12px] sm:bottom-auto left-[6px] right-[6px] sm:right-auto sm:w-[468px] sm:top-[6px] sm:left-[18px] z-20 nav"
	use:clickOutside={() => (open = '')}
>
	<div
		id="nav-holder"
		class="relative overflow-hidden transition-[height] duration-300 h-0
		*:absolute *:aria-hidden:opacity-0 *:aria-hidden:pointer-events-none *:anim-opacity *:w-full"
	>
		<div id="nav-main" aria-hidden={activeTab !== 'main' || !open}>
			<MainView
				{toggleTab}
				about={data?.settings.about}
				announcement={data?.settings.announcement}
			/>
		</div>
		<div id="nav-exhibitions" aria-hidden={activeTab !== 'exhibitions' || !open}>
			<ExhibitionView {recalcHeight} exhibitions={data?.exhibitions} />
		</div>
		<div id="nav-artists" aria-hidden={activeTab !== 'artists' || !open}>
			<ArtistView represented={data?.artists.represented} exhibited={data?.artists.exhibited} />
		</div>
		<div id="nav-newsletter" aria-hidden={activeTab !== 'newsletter' || !open}>
			<NewsletterView />
		</div>
	</div>

	<div
		class="flex *:flex-1 h-[33px] sm:h-[27px]
					*:cursor-pointer *:transition-colors *:bg-black/0 *:duration-300
					*:data-[active=true]:italic *:data-[active=false]:bg-black/5 *:mobile-small-serif *:sm:small-serif *:my-0!"
	>
		<button
			on:click={() => {
				if (open === '' && $page.url.pathname !== '/') {
					goto('/');
				}
				toggleTab('main');
			}}
			data-active={activeTab === 'main' || activeTab === 'newsletter'}>LUmkA</button
		>
		<button on:click={() => toggleTab('exhibitions')} data-active={activeTab === 'exhibitions'}
			>Exhibitions</button
		>
		<button on:click={() => toggleTab('artists')} data-active={activeTab === 'artists'}
			>Artists</button
		>
		<a href="/press" class="" data-active={activeTab === 'press'} on:click={() => toggleTab('')}>
			<div class="flex h-full w-full items-center justify-center pointer-cursor">Press</div>
		</a>
	</div>
</div>

<style>
	.nav {
		box-shadow: 0px 0px 15px rgba(138, 147, 132, 0.1);
	}
</style>
