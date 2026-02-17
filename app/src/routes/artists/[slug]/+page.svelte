<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import Anchor from '../../../components/Anchor.svelte';
	import CarouselPage from '../../../components/CarouselPage.svelte';
	import PressSection from '../../../components/PressSection.svelte';
	import Body from '../../../components/Text/Body.svelte';
	import TextRotate from '../../../components/Text/TextRotate.svelte';
	import WorksSection from '../../../components/WorksSection.svelte';

	export let data;
	let q;
	$: q = useQuery(data);

	let artists;
	$: ({ data: artists } = $q);
</script>

<CarouselPage
	items={artists}
	currentSlug={data.options.slug}
	routeBase="/artists"
	getDetails={(item) =>
		`${item.represented ? 'Represented' : 'Exhibited'} Artist\n${item.works.length} works with LUmkA`}
>
	<svelte:fragment slot="slide" let:item>
		<h1 class="title italic text-center">{item?.title}</h1>

		<div class="whitespace-pre-line text-center mt-[24px]">
			<p class="small-sans">
				<PortableText value={removeEmptyPortableTextBlocks(item?.schooling)} />
			</p>
		</div>

		<div
			class="mt-[24px] flex gap-[9px] *:small-sans *:hover:opacity-60 *:transition-opacity justify-center"
		>
			{#if item?.exhibitions && item.exhibitions.length > 0}
				<a href="#exhibitions">Exhibitions</a>
			{/if}
			{#if item?.works && item.works.length > 0}
				<a href="#works">Works</a>
			{/if}
			{#if item?.press && item.press.length > 0}
				<a href="#press">Press</a>
			{/if}

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
		{#if currentItem?.exhibitions && currentItem.exhibitions.length > 0}
			<Anchor title="Exhibitions">
				<div class="main-grid">
					<div
						class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
					>
						{#each currentItem?.exhibitions as exhibition}
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
		{/if}

		<!-- Works -->
		{#if currentItem?.works && currentItem.works.length > 0}
			<WorksSection works={currentItem.works} />
		{/if}

		<!-- Press -->
		{#if currentItem?.press && currentItem.press.length > 0}
			<PressSection pressItems={currentItem.press} />
		{/if}
	</svelte:fragment>
</CarouselPage>
