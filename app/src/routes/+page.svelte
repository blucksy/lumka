<script lang="ts">
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import ImageWrapper from '../components/ImageWrapper.svelte';
	import LinkWrapper from '../components/LinkWrapper.svelte';
	import Tags from '../components/Tags.svelte';
	import TextRotate from '../components/Text/TextRotate.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: publications } = $q);
</script>

<Tags />

<div class="pb-[96px] pt-[48px] sm:py-[96px] flex flex-col gap-[96px] sm:gap-[144px] anim-opacity">
	{#each publications.publications as item}
		<div class="main-grid px-page text-center">
			<div
				class="col-span-10 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4 2xl:col-span-7 2xl:col-start-5
				"
			>
				<LinkWrapper
					href={item.link?.slug ? `${item.link._type}s/${item.link.slug.current}` : undefined}
					className="flex flex-col gap-[18px] sm:gap-[24px] group"
				>
					<ImageWrapper
						sizes={'(max-width: 658px) 95vw, 60vw'}
						srcset={[768, 1280, 2000, 3000]}
						alt={item.title[0]?.children[0]?.text || 'LUmkA'}
						image={item.image}
						className="aspect-5/3 "
					/>
					<p class="small-serif small-caps">{item.category}</p>
					<p class="mobile-link sm:link-serif col-span xl:[--span:7] 2xl:[--span:5] mx-auto">
						{#if item.link}
							<TextRotate item={item.title} />
						{:else}
							<PortableText value={removeEmptyPortableTextBlocks(item.title)} />
						{/if}
					</p>
					{#if item.subtitle}
						<p
							class="sans max-w-[320px] sm:max-w-none sm:col-span sm:[--span:7] lg:[--span:5] 2xl:[--span:3] mx-auto"
						>
							<PortableText value={item.subtitle} />
						</p>
					{/if}
				</LinkWrapper>
			</div>
		</div>
	{/each}
</div>
