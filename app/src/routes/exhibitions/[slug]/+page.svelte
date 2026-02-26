<script lang="ts">
	import { browser } from '$app/environment';
	import { urlFor } from '$lib/sanity/image';
	import formatDate from '$lib/utils/formatDate.js';
	import getLastName from '$lib/utils/getLastName.js';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import CarouselPage from '../../../components/CarouselPage.svelte';
	import ImageWrapper from '../../../components/ImageWrapper.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import PressSection from '../../../components/PressSection.svelte';
	import Tags from '../../../components/Tags.svelte';
	import Body from '../../../components/Text/Body.svelte';
	import WorksSection from '../../../components/WorksSection.svelte';

	export let data;
	const q = useQuery(data);

	let shows;
	$: ({ data: shows } = $q);

	let currentShow;
	$: currentShow = shows?.find((s) => s.slug.current === data.options.slug);
</script>

<Tags
	title={currentShow?.title || 'Exhibition'}
	image={currentShow?.exhibitionImage
		? urlFor(currentShow.exhibitionImage.asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

<CarouselPage
	items={shows}
	currentSlug={data?.options?.slug}
	routeBase="/exhibitions"
	getDetails={(item) => `${item.venue}\n${formatDate(item.startDate, item.endDate)}`}
>
	<svelte:fragment slot="slide" let:item>
		<h1 class="title italic text-center text-balance" tabindex="-1">{item?.title}</h1>
		<div class="col-span [--span:11] md:[--span:9] lg:[--span:7] 2xl:[--span:5] mx-auto mt-[48px]">
			<ImageWrapper
				className="w-full"
				sizes={'(max-width: 658px) 95vw, 60vw'}
				srcset={[768, 1280, 1800, 2300]}
				image={item?.exhibitionImage}
				loading="lazy"
				zoomable={true}
				alt={item?.exhibitionImage?.alt || item?.title + ' from LUmkA'}
			/>
		</div>
		<div class="mt-[18px] text-center">
			<p class="sans">
				{#if browser}
					{#each item?.artist.sort( (a, b) => getLastName(a.title).localeCompare(getLastName(b.title)) ) as artist, i}
						<a class="hover:opacity-60 anim-opacity" href="/artists/{artist.slug.current}"
							>{artist.title}</a
						>{#if i < item.artist.length - 1},&nbsp;{/if}
					{/each}
				{/if}
				<br />
				{item.venue}
				<br />
				{formatDate(item.startDate, item.endDate)}
			</p>
		</div>
		<div
			class="mt-[18px] flex gap-[9px] *:small-sans *:hover:opacity-60 *:anim-opacity justify-center"
		>
			{#if item?.works && item.works.length > 0}
				<a href="#works">Works</a>
			{/if}

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
	</svelte:fragment>

	<svelte:fragment slot="content" let:currentItem>
		{#key currentItem}
			<!-- Artists -->
			<div
				class="flex flex-col gap-[48px] justify-center sm:flex-row sm:flex-wrap sm:gap-[calc(((100vw-(36px+24px*14))/15+48px))] 2xl:px-40"
			>
				{#each currentItem?.artist.sort( (a, b) => getLastName(a.title).localeCompare(getLastName(b.title)) ) as artist}
					<a
						href="/artists/{artist.slug.current}"
						class="col-span sm:[--span:5] 2xl:[--span:4] hover:opacity-60 anim-opacity flex flex-col gap-[18px] h-fit"
					>
						<p class=" small-caps mobile-small-serif">{artist.title} (B. {artist.year})</p>
						<div
							class="*:mobile-small-serif *:sm:small-serif flex flex-col gap-[18px] indent-[24px]"
						>
							<PortableText value={artist.shortBio} />
						</div>
					</a>
				{/each}
			</div>

			<!-- Media -->
			{#each currentItem?.content || [] as media}
				<MediaEntry fallbackTitle={currentItem?.title} entry={media} />
			{/each}

			<!-- Works -->
			{#if currentItem?.works && currentItem.works.length > 0}
				<WorksSection works={currentItem.works} />
			{/if}

			<!-- Press -->
			{#if currentItem?.press && currentItem.press.length > 0}
				<PressSection pressItems={currentItem.press} />
			{/if}
		{/key}
	</svelte:fragment>
</CarouselPage>
