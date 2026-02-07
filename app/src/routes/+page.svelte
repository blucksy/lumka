<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';
	import ImageWrapper from '../components/ImageWrapper.svelte';
	import { PortableText } from '@portabletext/svelte';
	import PublicationCard from '../components/PublicationCard.svelte';

	export let data: PageData;
	const q = useQuery(data);
	$: isDesktop = false;

	onMount(() => {
		isDesktop = true;
	});

	$: ({ data: publications } = $q);
	$: console.log(publications.publications);
</script>

<!-- <Tags
	title="Home"
	image={homepage?.[0]?.content?.[0]?.asset
		? urlFor(homepage[0].content[0].asset).auto('format').url()
		: ''}
/> -->
<section class=" !gap-y-[var(--xxl)] site-grid">
	{#if publications.publications}
		{#each publications.publications as publication}
			<PublicationCard {publication} />
		{/each}
	{/if}
</section>
