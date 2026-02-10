<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import MediaEntry from '../../../components/MediaEntry.svelte';
	import Press from '../../../components/Press.svelte';
	import TextRotate from '../../../components/Text/TextRotate.svelte';

	export let data;
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

		<div class="mt-[96px] md:mt-[48px] main-grid">
			<div
				class="col-span-10 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4 *:mobile-body sm:*:body *:indent-[48px] *:first:indent-0 flex flex-col gap-[24px]"
			>
				<PortableText value={artist?.longBio} />
			</div>
		</div>
	</div>

	<!-- Exhibitions -->

	<div class="flex flex-col gap-[24px] sm:gap-[48px]">
		<p class="small-caps small-serif text-center" id="exhibitions">Exhibitions</p>
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
	</div>

	<!-- Works -->
	<div class="flex flex-col gap-[24px] sm:gap-[48px]">
		<p class="small-caps small-serif text-center" id="works">Works</p>

		{#each artist?.works ?? [] as work}
			<div class="flex flex-col gap-[96px]">
				<MediaEntry entry={work} />
			</div>
		{/each}
	</div>

	<!-- Press -->

	<div class="flex flex-col gap-[24px] sm:gap-[48px]">
		<p class="small-caps small-serif text-center" id="press">Press</p>

		<div class="main-grid">
			<div
				class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
			>
				{#each artist?.press ?? [] as press}
					<Press item={press} />
				{/each}
			</div>
		</div>
	</div>
</div>
