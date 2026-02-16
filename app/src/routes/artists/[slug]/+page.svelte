<script lang="ts">
	import { goto } from '$app/navigation';
	import formatDate from '$lib/utils/formatDate';
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Mousewheel } from 'swiper/modules';
	import Anchor from '../../../components/Anchor.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import Tabber from '../../../components/Tabber.svelte';
	import Body from '../../../components/Text/Body.svelte';
	import TextRotate from '../../../components/Text/TextRotate.svelte';

	import 'swiper/css';
	import 'swiper/css/mousewheel';

	export let data;
	console.log(data);
	let q;
	$: q = useQuery(data);

	let artists;

	$: ({ data: artists } = $q);

	$: console.log(artists);

	let currentArtist;

	$: currentArtist = artists?.find((a) => a.slug.current === data.options.slug);

	let swiper;

	onMount(() => {
		const initialIndex = artists?.findIndex((a) => a.slug.current === data.options.slug) || 0;
		swiper = new Swiper('.swiper', {
			modules: [Mousewheel],
			loop: true,
			speed: 750,
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			mousewheel: {
				forceToAxis: true
			},
			initialSlide: initialIndex,
			autoHeight: true
		});

		swiper.on('slideChange', () => {
			// Figure out the real index in your `artists` array
			const realIndex = swiper.realIndex;
			const artist = artists[realIndex];
			if (artist && artist.slug.current !== currentArtist?.slug.current) {
				currentArtist = artist;

				// Shallow update the route
				goto(`/artists/${artist.slug.current}`, { replaceState: true, noScroll: true });
			}
		});

		const zoom = mediumZoom('[data-zoomable]', {
			margin: 24,
			background: 'rgba(256, 256, 256, 0.75)',
			scrollOffset: 0
		});

		return () => {
			zoom.detach();
		};
	});

	let nextArtist, previousArtist;
	$: {
		const currentIndex = artists?.findIndex((a) => a.slug.current === data.options.slug) ?? -1;

		nextArtist = currentIndex < artists.length - 1 ? artists[currentIndex + 1] : artists[0];
		previousArtist = currentIndex > 0 ? artists[currentIndex - 1] : artists[artists.length - 1];
	}
</script>

<div class="py-[96px] flex flex-col gap-[144px] items-center px-page">
	<!-- Main	-->
	<div
		class="swiper w-screen -mx-[36px]! -mb-[18px] relative"
		role="region"
		aria-roledescription="carousel"
	>
		<div
			class="bottom-0 absolute h-[18px] w-screen left-0 bg-linear-to-t from-white to-transparent z-10"
		></div>
		<div class="swiper-wrapper will-change-transform">
			{#each artists as item, i}
				<div
					id="slide-{i}"
					class="swiper-slide w-fit! [&:not(.swiper-slide-active)]:*:opacity-20 [&:not(.swiper-slide-active)]:*:pointer-events-none lg:[--span:1]! pb-[18px]"
					aria-hidden={item.slug.current !== currentArtist?.slug.current}
				>
					<div
						class="col-span [--span:13] md:[--span:11] lg:[--span:9] transition-opacity duration-500"
					>
						<h1 class="title italic text-center">{item?.title}</h1>

						<div class="whitespace-pre-line text-center mt-[24px]">
							<p class="small-sans">
								<PortableText value={removeEmptyPortableTextBlocks(item?.schooling)} />
							</p>
						</div>

						<div
							class="mt-[24px] flex gap-[9px] *:sans *:hover:opacity-60 *:transition-opacity justify-center"
						>
							<a href="#exhibitions">Exhibitions</a>
							<a href="#works">Works</a>
							<a href="#press">Press</a>

							{#each item?.extraLinks ?? [] as link}
								<a href={link?.url} target="_blank" rel="noopener noreferrer">
									{link?.label}
								</a>
							{/each}
						</div>

						<div class="mt-[96px] *:block!"><Body text={item?.longBio} /></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Exhibitions -->
	<Anchor title="Exhibitions">
		<div class="main-grid">
			<div
				class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
			>
				{#each currentArtist?.exhibitions ?? [] as exhibition}
					<a
						href="/exhibitions/{exhibition.slug.current}"
						class="text-center flex flex-col gap-[18px] group"
					>
						<p class="sm:link-serif mobile-link italic"><TextRotate item={exhibition.title} /></p>
						<p class="sans">
							{#if exhibition?.artists?.length > 1}
								{#each exhibition?.artists as artist, i}
									{artist}{#if i < exhibition.artists.length - 1},&nbsp;{/if}
								{/each}
								<br />
							{/if}
							{formatDate(exhibition.startDate, exhibition.endDate)}
							<br />
							{exhibition?.venue}
						</p>
					</a>
				{/each}
			</div>
		</div>
	</Anchor>

	<!-- Works -->
	<Anchor title="Works">
		<div class="flex flex-col gap-[96px]">
			{#each currentArtist?.works ?? [] as work}
				<MediaEntry entry={work} />
			{/each}
		</div>
	</Anchor>

	<!-- Press -->
	<Anchor title="Press">
		<div class="main-grid">
			<div
				class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
			>
				{#each currentArtist?.press || [] as press}
					<Press item={press} />
				{/each}
			</div>
		</div>
	</Anchor>

	<div class="flex items-center">
		<button
			on:click={() => {
				window.scrollTo({ behavior: 'smooth', top: 0 });
			}}
			class="hover:opacity-60 transition-opacity w-fit mx-auto sans cursor-pointer"
			>Return to Top</button
		>
	</div>

	<Tabber
		next={{
			link: `/artists/${nextArtist?.slug.current}`,
			title: nextArtist?.title,
			details: `${nextArtist?.represented ? 'Represented' : 'Exhibited'} Artist\n${nextArtist?.workCount} works with LUmkA`
		}}
		previous={{
			link: `/artists/${previousArtist?.slug.current}`,
			title: previousArtist?.title,
			details: `${previousArtist?.represented ? 'Represented' : 'Exhibited'} Artist\n${previousArtist?.workCount} works with LUmkA`
		}}
	/>
</div>
