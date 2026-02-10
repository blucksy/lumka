<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import formatDate from '$lib/utils/formatDate';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import Anchor from '../../../components/Anchor.svelte';
	import ImageWrapper from '../../../components/ImageWrapper.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import Tabber from '../../../components/Tabber.svelte';
	import Tags from '../../../components/Tags.svelte';
	import Body from '../../../components/Text/Body.svelte';

	export let data;
	const q = useQuery(data);

	let show;

	$: ({ data: show } = $q);

	$: console.log(show);

	onMount(() => {
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
		const currentIndex = show.allExhibitions.findIndex((e) => e.slug.current === show.slug.current);

		previousExhibition =
			currentIndex > 0
				? show.allExhibitions[currentIndex - 1]
				: show.allExhibitions[show.allExhibitions.length - 1];

		nextExhibition =
			currentIndex < show.allExhibitions.length - 1
				? show.allExhibitions[currentIndex + 1]
				: show.allExhibitions[0];
	}
</script>

<Tags
	title={show?.title || 'Exhibition'}
	image={show?.exhibitionImage
		? urlFor(show.exhibitionImage.asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

<div class="py-[96px] flex flex-col gap-[144px] items-center px-page">
	<!-- Main	-->
	<div>
		<h1 class="title italic text-center">{show?.title}</h1>
		<div class="main-grid mt-[48px]">
			<div
				class="col-span-11 sm:col-start-3 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-5"
			>
				<ImageWrapper
					className="aspect-5/3 object-cover"
					image={show?.exhibitionImage}
					zoomable={true}
				/>
			</div>
		</div>
		<div class="mt-[18px] text-center">
			<p class="sans">
				{#each show?.artist || [] as artist, i}
					<a class="hover:opacity-60 transition-opacity" href="/artists/{artist.slug.current}"
						>{artist.title}</a
					>{#if i < show.artist.length - 1},&nbsp;{/if}
				{/each}
				<br />
				{show.venue}
				<br />
				{formatDate(show.startDate, show.endDate)}
			</p>
		</div>
		<div
			class="mt-[18px] flex gap-[9px] *:sans *:hover:opacity-60 *:transition-opacity justify-center"
		>
			<a href="#works">Works</a>

			<a href="#press">Press</a>
			{#each show?.extraLinks || [] as link}
				<a href={link?.url} target="_blank" rel="noopener noreferrer">
					{link?.label}
				</a>
			{/each}
		</div>

		<div class="mt-[96px]">
			<Body text={show?.writeup} />
		</div>
	</div>

	<!-- Artists -->
	<div
		class="flex flex-col gap-[48px] sm:flex-row sm:flex-wrap sm:gap-[calc(((100vw-(36px+24px*14))/15+48px))]"
	>
		{#each show?.artist || [] as artist}
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
	{#each show?.content || [] as media}
		<MediaEntry entry={media} />
	{/each}

	<!-- Works -->
	<Anchor title="Works">
		<div class="flex flex-col gap-[96px]">
			{#each show?.works || [] as work}
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
				{#each show?.press || [] as press}
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
