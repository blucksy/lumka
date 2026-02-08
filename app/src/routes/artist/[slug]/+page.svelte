<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import ImageWrapper from '../../../components/ImageWrapper.svelte';
	import { urlFor } from '$lib/sanity/image';
	import { fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Tags from '../../../components/Tags.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import VideoWrapper from '../../../components/VideoWrapper.svelte';
	import { PortableText } from '@portabletext/svelte';
	import { projectId } from '$lib/sanity/api';

	export type Artist = {
		_id: string;
		_type: 'artist';
		_createdAt: string;
		_updatedAt: string;
		_rev: string;

		title: string;

		slug: {
			current: string;
		};

		orderRank: string;

		schooling: string;

		shortBio: any[];
		longBio: any[];
	};

	export let data;
	const q = useQuery(data);

	let gridView = false;

	let post: Artist | null = null;

	$: ({ data: post } = $q);

	let currentIndex = 0;

	$: isDesktop = false;
	$: console.log(post?.artist);
	// onMount, set isDesktop based on window width

	// listen for urlChange to set gridView
</script>

<div class="flex flex-col gap-[var(--xxl)] justify-center">
	<div>
		<h1 class="type-title text-center">{post?.artist.title}</h1>

		<ImageWrapper
			image={post?.artist.exhibitionImage}
			alt={post?.artist.title}
			srcset={[128, 256, 384, 512]}
		/>
		<div class="flex mx-auto w-full">{post?.artist.schooling}</div>
	</div>
</div>
<div>
	<PortableText value={post?.artist.longBio} />
	<!-- d -->
</div>
<div>
	{#if post.artist.content}
		{#each post?.artist.content as item}
			{#if item._type === 'image'}
				<ImageWrapper image={item.asset} alt={post?.artist.title} srcset={[128, 256, 384, 512]} />
			{/if}
		{/each}
	{/if}
</div>
<div>
	{#if post.artist.work}
		{#each post?.artist.works as work}
			{work}
		{/each}
	{/if}
</div>
