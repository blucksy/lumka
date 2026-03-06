<script lang="ts">
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import clsx from 'clsx';
	import ImageWrapper from './ImageWrapper.svelte';

	export let entry;
	export let fallbackTitle = 'LUmkA';

	let image = entry?.asset || entry?.image;
</script>

{#if entry}
	<div
		class={clsx(
			entry?.aspectRatio && entry?.aspectRatio < 1
				? 'col-span sm:[--span:12] md:[--span:10] lg:[--span:8]'
				: 'col-span sm:[--span:20] md:[--span:18] lg:[--span:14] xl:[--span:12]',
			'w-full mx-auto'
		)}
	>
		{#if entry.embed}
			<div class="aspect-video">
				{@html entry.embed}
			</div>
		{:else if image && !image._upload}
			<ImageWrapper
				className="w-full"
				sizes={'(max-width: 658px) 95vw, 60vw'}
				srcset={[768, 1280, 1800, 2300]}
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
								class="hover:opacity-60 anim-opacity">{entry.artist.title}</a
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
{/if}
