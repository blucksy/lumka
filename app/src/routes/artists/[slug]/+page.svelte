<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import Anchor from '../../../components/Anchor.svelte';
	import CarouselPage from '../../../components/CarouselPage.svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import Body from '../../../components/Text/Body.svelte';
	import TextRotate from '../../../components/Text/TextRotate.svelte';

	export let data;
	let q;
	$: q = useQuery(data);

	let artists;
	$: ({ data: artists } = $q);

	let nextArtist, previousArtist;
	$: {
		const currentIndex = artists?.findIndex((a) => a.slug.current === data.options.slug) ?? -1;
		nextArtist = currentIndex < artists.length - 1 ? artists[currentIndex + 1] : artists[0];
		previousArtist = currentIndex > 0 ? artists[currentIndex - 1] : artists[artists.length - 1];
	}
</script>

<CarouselPage
	items={artists}
	currentSlug={data.options.slug}
	routeBase="/artists"
	tabberNext={{
		link: `/artists/${nextArtist?.slug.current}`,
		title: nextArtist?.title,
		details: `${nextArtist?.represented ? 'Represented' : 'Exhibited'} Artist\n${nextArtist?.workCount} works with LUmkA`
	}}
	tabberPrevious={{
		link: `/artists/${previousArtist?.slug.current}`,
		title: previousArtist?.title,
		details: `${previousArtist?.represented ? 'Represented' : 'Exhibited'} Artist\n${previousArtist?.workCount} works with LUmkA`
	}}
>
	<svelte:fragment slot="slide" let:item>
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
	</svelte:fragment>

	<svelte:fragment slot="content" let:currentItem>
		<!-- Exhibitions -->
		<Anchor title="Exhibitions">
			<div class="main-grid">
				<div
					class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
				>
					{#each currentItem?.exhibitions ?? [] as exhibition}
						<a
							href="/exhibitions/{exhibition.slug.current}"
							class="text-center flex flex-col gap-[18px] group"
						>
							<p class="sm:link-serif mobile-link italic">
								<TextRotate item={exhibition.title} />
							</p>
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
				{#each currentItem?.works ?? [] as work}
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
					{#each currentItem?.press || [] as press}
						<Press item={press} />
					{/each}
				</div>
			</div>
		</Anchor>
	</svelte:fragment>
</CarouselPage>
