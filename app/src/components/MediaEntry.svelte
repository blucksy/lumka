<script lang="ts">
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import clsx from 'clsx';
	import ImageWrapper from './ImageWrapper.svelte';

	export let entry;
	export let fallbackTitle = 'LUmkA';

	let image = entry?.asset || entry?.image;
</script>

<div class="main-grid w-full">
	<div
		class={clsx(
			entry?.aspectRatio && entry?.aspectRatio < 1
				? 'col-span-6 col-start-3 sm:col-span-9 sm:col-start-4  md:col-span-7 md:col-start-5 lg:col-span-5 lg:col-start-6 2xl:col-span-3 2xl:col-start-7'
				: 'col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4 2xl:col-span-7 2xl:col-start-5',
			'w-full'
		)}
	>
		{#if entry.embed}
			<div class="aspect-video">
				{@html entry.embed}
			</div>
		{:else if image}
			<ImageWrapper
				className="w-full"
				sizes={'(max-width: 658px) 95vw, 60vw'}
				srcset={[768, 1280, 2000]}
				{image}
				zoomable={true}
				alt={entry?.title || fallbackTitle}
			/>
		{/if}
		{#if entry.title}
			<div class="mt-[18px] sm:mt-[24px] flex flex-col gap-[12px] text-center">
				<div class="mobile-body sm:body">
					{#if entry.year}
						{#if entry.artist}<a
								href="/artists/{entry.artist.slug.current}"
								class="hover:opacity-60 transition-opacity">{entry.artist.title}</a
							>,{/if}
						<span class="italic">{entry.title}</span>, {entry.year}
					{:else}
						<PortableText value={entry.title} />
					{/if}
				</div>
				{#if entry.credit}
					<p class="small-sans">{entry.credit}</p>
				{:else if entry.description}
					<div class="*:small-sans flex flex-col gap-[9px] max-w-[420px] mx-auto">
						<PortableText value={removeEmptyPortableTextBlocks(entry.description)} />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
