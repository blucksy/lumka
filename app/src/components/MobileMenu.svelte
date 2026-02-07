<script lang="ts">
	import { page } from '$app/stores';
	import { PortableText } from '@portabletext/svelte';
	import { goto } from '$app/navigation';

	export let mobileNavOpen;
	export let settings;

	$: url = $page.url.pathname;

	console.log(settings);

	$: activeTags = $page.url.searchParams.getAll('tag');

	const isActive = (tag: string) =>
		activeTags.includes(tag) || (tag === 'multi' && activeTags.length === 0);

	const tagClass = (tag: string) =>
		activeTags.length === 0 || isActive(tag) ? 'opacity-100' : 'opacity-30';

	$: grid = $page.url.searchParams.get('grid'); // string | null
	$: isMultiGrid = grid === 'true'; // boolean

	const gridItemClass = (mode: 'single' | 'multi') => {
		// if grid=true => multi active, else single active
		const active = mode === 'multi' ? isMultiGrid : !isMultiGrid;
		return active ? 'opacity-100' : 'opacity-30';
	};

	const ariaPressedForGrid = (mode: 'single' | 'multi') =>
		mode === 'multi' ? isMultiGrid : !isMultiGrid;

	function redirectToTag(tag: string) {
		// clone current URLSearchParams
		const params = new URLSearchParams($page.url.searchParams);
		const tags = params.getAll('tag');

		if (tags.includes(tag)) {
			// remove this tag
			params.delete('tag');
			tags.filter((t) => t !== tag).forEach((t) => params.append('tag', t));
		} else {
			params.append('tag', tag);
		}

		const queryString = params.toString();
		const url = queryString ? `/exhibitions?${queryString}` : '/exhibitions';

		mobileNavOpen = false;
		setTimeout(() => {
			goto(url, { invalidateAll: true });
		}, 500);
	}
	// redirect to grid if multi grid=multi otherwise remove grid param
	function redirectToGrid(mode: 'single' | 'multi') {
		const params = new URLSearchParams($page.url.searchParams);

		if (mode === 'multi') {
			params.set('grid', 'true');
		} else {
			params.delete('grid');
		}

		const queryString = params.toString();
		const slug = $page.url.pathname.split('/')[2];

		const url = queryString ? `/exhibitions/${slug}?${queryString}` : `/exhibitions/${slug}`;

		mobileNavOpen = false;
		setTimeout(() => {
			goto(url);
		}, 500);
	}
	const { contactLink, manager, printsInquiries, socialMedia } =
		settings?.siteSettings?.mobileSettings || {};
</script>

<div
	class={`h-screen flex flex-col gap-7.5 anim-opacity pt-nav fixed px-page z-30 bg-neutral opacity-0 inset-0 left-0 ${mobileNavOpen ? 'opacity-100 h-screen pointer-events-auto' : 'h-0  opacity-0 pointer-events-none'}`}
>
	<a href="/exhibitions" class="type-xl trim-xl block">Index</a>
	<a href="/info" class="type-xl trim-xl block">Info</a>
	<a href="https://substack.com/home" target="_blank" class="type-xl trim-xl block">Journal</a>
	{#key $page.url.search}
		{#if $page.url.pathname === '/exhibitions'}
			<div class="w-full h-[1px] bg-black/30"></div>

			<div class="!px-0 grid grid-cols-6 gap-2.5 px-5">
				<div class="col-span-3"><p class="type-sm trim-sm">Filter</p></div>
				<div class="col-span-3 flex flex-col gap-[10px]">
					{#if settings?.allTags}
						{#each settings?.allTags as tag}
							<button
								class={`trim-sm text-left type-sm ${tagClass(tag.name)}`}
								aria-pressed={isActive(tag.name)}
								on:click|preventDefault={() => redirectToTag(tag.name)}>{tag.name}</button
							>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	{/key}

	{#if settings?.siteSettings.mobileSettings}
		<div class="w-full h-[1px] bg-black/30"></div>
		<div
			class=" grid grid-cols-6 gap-2.5 px-5 *:col-span-3 type-sm px-0! [&>*:not(.mobile-settings-grid)]:opacity-30!"
		>
			<!-- {#each settings?.siteSettings.mobileSettings as setting}
			{setting}
		{/each} -->
			<p class="mobile-settings-grid">Contact</p>
			<PortableText value={contactLink} />
			<p class="mobile-settings-grid">Manager</p>

			<PortableText value={manager} />
			<p class="mobile-settings-grid">Prints/inquiries</p>

			<PortableText value={printsInquiries} />
			<p class="mobile-settings-grid">Social</p>

			<PortableText value={socialMedia} />
		</div>
	{/if}
	<div class="flex fixed bottom-[25px] flex-row gap-4 w-full s-PT7ZfvsUVUBV">
		<img src="/footer-logo.svg" alt="LUmkA Logo" class="h-[25px] w-min my-auto" />
		<div class="flex flex-col">
			<p class="type-sm">
				© {new Date().getFullYear()} LUmkA
			</p>
			<p class="type-sm">All Rights Reserved</p>
		</div>
	</div>
</div>

<style>
	.mobile-settings-grid {
		grid-column: span 3 / span 3;
	}
</style>
