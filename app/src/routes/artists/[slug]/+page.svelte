<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import Anchor from '../../../components/Anchor.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import Tabber from '../../../components/Tabber.svelte';
	import Body from '../../../components/Text/Body.svelte';
	import TextRotate from '../../../components/Text/TextRotate.svelte';

	export let data;
	console.log(data);
	const q = useQuery(data);

	let artist;

	$: ({ data: artist } = $q);

	$: console.log(artist);

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

	let nextArtist, previousArtist;
	$: {
		const currentArray = artist.exhibited
			? artist.allArtists.exhibited
			: artist.allArtists.represented;
		const otherArray = artist.exhibited
			? artist.allArtists.represented
			: artist.allArtists.exhibited;

		const currentIndex = currentArray.findIndex((a) => a.slug.current === artist.slug.current);

		previousArtist =
			currentIndex > 0 ? currentArray[currentIndex - 1] : otherArray[otherArray.length - 1];

		nextArtist =
			currentIndex < currentArray.length - 1 ? currentArray[currentIndex + 1] : otherArray[0];
	}
</script>

<div class="py-[96px] flex flex-col gap-[144px] items-center px-page">
	<!-- Main	-->
	<div>
		<h1 class="title italic text-center">{artist?.title}</h1>

		<div class="whitespace-pre-line text-center mt-[24px]">
			<p class="small-sans">
				<PortableText value={removeEmptyPortableTextBlocks(artist?.schooling)} />
			</p>
		</div>

		<div
			class="mt-[24px] flex gap-[9px] *:sans *:hover:opacity-60 *:transition-opacity justify-center"
		>
			<a href="#exhibitions">Exhibitions</a>
			<a href="#works">Works</a>
			<a href="#press">Press</a>

			{#each artist?.extraLinks ?? [] as link}
				<a href={link?.url} target="_blank" rel="noopener noreferrer">
					{link?.label}
				</a>
			{/each}
		</div>

		<div class="mt-[96px] md:mt-[48px]">
			<Body text={artist?.longBio} />
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
				{#each artist?.exhibitions ?? [] as exhibition}
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
			{#each artist?.works ?? [] as work}
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
				{#each artist?.press || [] as press}
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
