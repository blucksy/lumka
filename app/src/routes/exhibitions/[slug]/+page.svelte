<script lang="ts">
	import { goto } from '$app/navigation';
	import { urlFor } from '$lib/sanity/image';
	import formatDate from '$lib/utils/formatDate.js';
	import getLastName from '$lib/utils/getLastName.js';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Mousewheel } from 'swiper/modules';
	import Anchor from '../../../components/Anchor.svelte';
	import ImageWrapper from '../../../components/ImageWrapper.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import Tabber from '../../../components/Tabber.svelte';

	import Tags from '../../../components/Tags.svelte';
	import Body from '../../../components/Text/Body.svelte';

	import 'swiper/css';
	import 'swiper/css/mousewheel';

	export let data;
	let q;
	$: q = useQuery(data);

	let shows;
	let currentShow;

	$: ({ data: shows } = $q);

	$: currentShow = shows?.find((s) => s.slug.current === data.options.slug);

	let swiper;

	onMount(() => {
		const initialIndex = shows?.findIndex((s) => s.slug.current === data.options.slug) || 0;
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
			// Figure out the real index in your `shows` array
			const realIndex = swiper.realIndex;
			const show = shows[realIndex];
			if (show && show.slug.current !== currentShow?.slug.current) {
				currentShow = show;

				// Shallow update the route
				goto(`/exhibitions/${show.slug.current}`, { replaceState: true, noScroll: true });
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

	let nextExhibition, previousExhibition;
	$: {
		const currentIndex = shows.findIndex((e) => e.slug.current === currentShow.slug.current);

		previousExhibition = currentIndex > 0 ? shows[currentIndex - 1] : shows[shows.length - 1];

		nextExhibition = currentIndex < shows.length - 1 ? shows[currentIndex + 1] : shows[0];
	}
</script>

<Tags
	title={currentShow?.title || 'Exhibition'}
	image={currentShow?.exhibitionImage
		? urlFor(currentShow.exhibitionImage.asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

<div class="py-[96px] flex flex-col gap-[144px] items-center px-page">
	<!-- Main	-->

	<div class="swiper w-screen -mx-[36px]! -mb-[18px] relative">
		<div
			class="bottom-0 absolute h-[18px] w-screen left-0 bg-linear-to-t from-white to-transparent z-10"
		></div>
		<div class="swiper-wrapper will-change-transform">
			{#each shows as item, i}
				<div
					id="slide-{i}"
					class="swiper-slide w-fit! [&:not(.swiper-slide-active)]:*:opacity-20 [&:not(.swiper-slide-active)]:*:pointer-events-none lg:[--span:1]! pb-[18px]"
				>
					<div
						class="col-span [--span:13] md:[--span:11] lg:[--span:9] transition-opacity duration-500"
					>
						<h1 class="title italic text-center">{item?.title}</h1>
						<div class="col-span [--span:11] md:[--span:9] lg:[--span:7] mx-auto mt-[48px]">
							<ImageWrapper
								className="aspect-5/3 object-cover"
								image={item?.exhibitionImage}
								zoomable={true}
							/>
						</div>
						<div class="mt-[18px] text-center">
							<p class="sans">
								{#each item?.artist.sort( (a, b) => getLastName(a.title).localeCompare(getLastName(b.title)) ) as artist, i}
									<a
										class="hover:opacity-60 transition-opacity"
										href="/artists/{artist.slug.current}">{artist.title}</a
									>{#if i < item.artist.length - 1},&nbsp;{/if}
								{/each}
								<br />
								{item.venue}
								<br />
								{formatDate(item.startDate, item.endDate)}
							</p>
						</div>
						<div
							class="mt-[18px] flex gap-[9px] *:sans *:hover:opacity-60 *:transition-opacity justify-center"
						>
							<a href="#works">Works</a>

							{#if item?.press && item.press.length > 0}
								<a href="#press">Press</a>
							{/if}
							{#each item?.extraLinks || [] as link}
								<a href={link?.url} target="_blank" rel="noopener noreferrer">
									{link?.label}
								</a>
							{/each}
						</div>

						<div class="mt-[96px] *:block!">
							<Body text={item?.writeup} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Artists -->
	<div
		class="flex flex-col gap-[48px] justify-center sm:flex-row sm:flex-wrap sm:gap-[calc(((100vw-(36px+24px*14))/15+48px))]"
	>
		{#each currentShow?.artist.sort( (a, b) => getLastName(a.title).localeCompare(getLastName(b.title)) ) as artist}
			<a
				href="/artists/{artist.slug.current}"
				class="sm:w-[calc(((100vw-(36px+24px*14))/15*5+24px*4))] hover:opacity-60 transition-opacity flex flex-col gap-[18px] h-fit"
			>
				<p class=" small-caps mobile-small-serif">{artist.title} (B. {artist.year})</p>
				<div class="*:mobile-small-serif *:sm:small-serif flex flex-col gap-[18px] indent-[24px]">
					<PortableText value={artist.shortBio} />
				</div>
			</a>
		{/each}
	</div>

	<!-- Media -->
	{#each currentShow?.content || [] as media}
		<MediaEntry entry={media} />
	{/each}

	<!-- Works -->
	<Anchor title="Works">
		<div class="flex flex-col gap-[96px]">
			{#each currentShow?.works || [] as work}
				<MediaEntry entry={work} />
			{/each}
		</div>
	</Anchor>

	<!-- Press -->
	{#if currentShow?.press && currentShow.press.length > 0}
		<Anchor title="Press">
			<div class="main-grid">
				<div
					class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
				>
					{#each currentShow?.press as press}
						<Press item={press} />
					{/each}
				</div>
			</div>
		</Anchor>
	{/if}

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
			link: `/exhibitions/${nextExhibition?.slug.current}`,
			title: nextExhibition?.title,
			details: `${nextExhibition.venue}\n${formatDate(nextExhibition.startDate, nextExhibition.endDate)}`
		}}
		previous={{
			link: `/exhibitions/${previousExhibition?.slug.current}`,
			title: previousExhibition?.title,
			details: `${previousExhibition.venue}\n${formatDate(previousExhibition.startDate, previousExhibition.endDate)}`
		}}
	/>
</div>
