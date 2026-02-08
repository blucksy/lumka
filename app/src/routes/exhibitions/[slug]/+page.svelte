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

	type Exhibition = {
		project: {
			_type: 'exhibition';
			title: string;
			slug: {
				current: string;
			};
			orderRank: string;
			artist: {
				_ref: string;
			}[];

			exhibitionImage: {
				asset: {
					_ref: string;
				};
			};
			writeup: {};
			content: {
				_type: string;
				asset: {
					_ref: string;
				};
			}[];

			eventDetails: any[];

			additionalInfo: {
				_key: string;
				title: any[];
				credits: string;
				link: string;
			}[];
		};
	};

	export let data;
	const q = useQuery(data);

	let gridView = false;

	let post: Exhibition | null = null;

	$: ({ data: post } = $q);

	let currentIndex = 0;

	$: isDesktop = false;
	$: console.log(post?.project);
	// onMount, set isDesktop based on window width

	// listen for urlChange to set gridView
</script>

<Tags
	title={post?.project?.title || 'Project'}
	image={post?.project?.content[0]?.asset && post?.project.content[0]?.asset._type === 'reference'
		? urlFor(post.project.content[0].asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

<div class="flex flex-col gap-[var(--xxl)] justify-center">
	<div>
		<h1 class="type-title text-center">{post?.project.title}</h1>

		<ImageWrapper
			image={post?.project.exhibitionImage}
			alt={post?.project.title}
			srcset={[128, 256, 384, 512]}
		/>
		<div class="flex mx-auto w-full">{post?.project.artist}</div>
	</div>
</div>
<div>
	<PortableText value={post?.project.writeup} />
</div>
<div>
	{#each post?.project.content as item}
		{#if item._type === 'image'}
			<ImageWrapper image={item.asset} alt={post?.project.title} srcset={[128, 256, 384, 512]} />
		{/if}
	{/each}
</div>
<div>
	{#if post.project.work}
		{#each post?.project.works as work}
			{work}
		{/each}
	{/if}
</div>
