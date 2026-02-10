<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { onMount } from 'svelte';
	import ImageWrapper from '../components/ImageWrapper.svelte';
	import Tags from '../components/Tags.svelte';
	import TextRotate from '../components/Text/TextRotate.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);
	$: isDesktop = false;

	onMount(() => {
		isDesktop = true;
	});

	$: ({ data: publications } = $q);
	$: console.log(publications.publications);
</script>

<Tags />

<div class="pt-[18px] sm:py-[96px] flex flex-col gap-[96px] sm:gap-[144px]">
	{#each publications.publications as item}
		<div class="main-grid px-page text-center">
			<div
				class="col-span-10 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
				flex flex-col gap-[18px] sm:gap-[24px]"
			>
				<ImageWrapper image={item.image} className="aspect-5/3 " />
				<p class="small-serif small-caps">{item.category}</p>
				<p class="mobile-link sm:link-serif">
					{#if item.link}
						<TextRotate item={item.title} />
					{:else}
						<PortableText value={item.title} />
					{/if}
				</p>
				{#if item.subtitle}
					<p class="sans"><PortableText value={item.subtitle} /></p>
				{/if}
			</div>
		</div>
	{/each}
</div>
