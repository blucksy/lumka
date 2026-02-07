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

	export let data;
	const q = useQuery(data);

	let gridView = false;

	$: ({ data: post } = $q);

	$: contentLength = post?.project?.content?.length;

	let currentIndex = 0;

	function increaseIndex() {
		currentIndex += 1;
	}
	function decreaseIndex() {
		currentIndex -= 1;
	}

	$: if (currentIndex < 0) {
		currentIndex = contentLength - 1;
	}
	$: if (currentIndex >= contentLength) {
		currentIndex = 0;
	}

	$: isDesktop = false;

	onMount(() => {
		isDesktop = true;
	});

	function preloadAdjacentImages() {
		if (!browser) return;

		// guard
		if (!post?.project.content?.length) return;

		const len = post.project.content.length;

		// wrap indexes
		const nextIndex = (currentIndex + 1) % len;
		const prevIndex = (currentIndex - 1 + len) % len;

		// pick a "best" preload width (match your main srcset)
		const PRELOAD_WIDTHS = [1600];

		const preloadAsset = (asset: any) => {
			// build URLs for a couple widths so the browser can pick quickly later
			for (const w of PRELOAD_WIDTHS) {
				const src = urlFor(asset).width(w).quality(90).auto('format').url();
				const img = new Image();
				img.decoding = 'async';
				img.src = src;
			}
		};

		// preloadAsset(post.project.content[nextIndex].asset);
		// preloadAsset(post.project.content[prevIndex].asset);
	}

	// run whenever the currently-visible image changes
	// $: if (post?.project.content?.length) preloadAdjacentImages();

	// listen for urlChange to set gridView
	$: gridView = $page.url.searchParams.get('grid') === 'true';

	function handleGridView() {
		const url = new URL($page.url); // clone
		if (gridView) url.searchParams.delete('grid');
		else url.searchParams.set('grid', 'true');

		// use a relative internal URL
		goto(`${url.pathname}?${url.searchParams.toString()}`, { replaceState: true });
	}
	function expandImage(index: number) {
		// fade out grid, toggle index, remove grid from url, fade in image
		currentIndex = index;
		// wait .2 seconds
		typeof window !== 'undefined' &&
			setTimeout(() => {
				handleGridView();
			}, 150);
	}
	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
	function handleKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;

		// Ignore typing contexts for live editor
		if (
			target?.tagName === 'INPUT' ||
			target?.tagName === 'TEXTAREA' ||
			target?.isContentEditable
		) {
			return;
		}

		if (e.key === 'ArrowRight') {
			e.preventDefault();
			increaseIndex();
		}

		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			decreaseIndex();
		}
	}
</script>

<Tags
	title={post?.project?.title || 'Project'}
	image={post?.project?.content[0]?.asset && post?.project.content[0]?.asset._type === 'reference'
		? urlFor(post.project.content[0].asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

{#if isDesktop}
	<button
		class=" cursor-pointer type-sm z-50 absolute right-5 top-type-sm top-[72px] md:top-28.25 anim-opacity md:right-12.5 leading-[9px]"
		style={`${gridView ? 'opacity:1;' : 'opacity:0.3;'}`}
		on:click={() => handleGridView()}
	>
		{post?.label.thumbnailLabel || 'Grid View'}
	</button>
	<div
		in:fade={{ duration: 350, easing: cubicInOut }}
		class={`absolute bottom-0 grid mobile-grid inset-0 h-screen w-screen overflow-hidden md:flex items-center justify-center anim-opacity  ${gridView ? 'opacity-0 !h-0 pointer-events-none' : 'opacity-100'}`}
	>
		{#if post.project.content[currentIndex].asset && post.project.content[currentIndex].asset._type === 'reference'}
			<ImageWrapper
				className={`md:h-[67vh] col-start-2 col-span-10 z-20  my-auto  mx-auto w-min opacity-0 pointer-events-none !object-contain  `}
				image={post.project.content[currentIndex].asset}
				alt={post.project.content[currentIndex].alt || post.project.title}
				quality={100}
				loading="lazy"
				sizes="(min-width: 650px) 50vw, 100vw"
				srcset={[1600]}
			/>
		{:else}
			<VideoWrapper
				className={`md:h-[67vh] col-start-2 col-span-10 z-20  my-auto  mx-auto  pointer-events-none !object-contain`}
				video={post.project.content[currentIndex]}
			/>
		{/if}
		<!-- if grid view pointer events none -->

		<div class={`fixed inset-0 z-10 ${gridView ? 'pointer-events-none' : ''}`}>
			<button
				class="fixed left-0 top-0 h-screen z-10 w-[50vw]"
				on:click={() => {
					decreaseIndex();
				}}
			></button>
			<button
				class="fixed right-0 top-0 h-screen z-10 w-[50vw]"
				on:click={() => {
					increaseIndex();
				}}
			></button>
		</div>
	</div>
	<!-- loop over images -->
	<div
		in:fade={{ duration: 300, easing: cubicInOut }}
		class={`anim-opacity overflow-hidden transition-opacity ${gridView ? 'opacity-100' : 'opacity-0 !h-0 pointer-events-none'}`}
	>
		<div
			style={`
		`}
			class={`grid thumbnail-grid pt-[92px] md:pt-[164px]  gap-y-25 w-full justify-between `}
		>
			{#each post.project.content as image, i}
				<div
					class="mx-auto w-25 cursor-pointer md:w-50 relative my-auto h-auto"
					on:click={() => expandImage(i)}
				>
					{#if image.asset && image.asset._type === 'reference'}
						<ImageWrapper
							image={image.asset}
							alt={image.alt || post.project.title}
							loading="lazy"
							sizes={`250px`}
							className=" !h-auto"
							quality={90}
							srcset={[128, 256, 384, 512]}
						/>
					{:else}
						<VideoWrapper video={image} />
					{/if}
				</div>
			{/each}
			<!-- if post length greather than 8 add a 240px space  -->
		</div>
	</div>

	{#if post.project.content.length > 4}
		<div style="height:200px;  w-screen"></div>
	{/if}
	<div
		class="fixed bottom-0 left-0 pb-7.5 md:pb-5 px-page flex z-30 flex-row justify-between w-screen"
	>
		{#if post.project.link}<a
				href={post.project.link}
				target="_blank"
				rel="noopener noreferrer"
				class="text-lg max-w-[80vw] md:type-lg link z-20"
				style={`--hover-color: ${post.project.color.hex}`}>{post.project.title}</a
			>
		{:else}
			<p class="text-lg md:type-lg z-20">{post.project.title}</p>
		{/if}
		<p class="text-lg md:type-lg z-20">{currentIndex + 1} / {contentLength}</p>

		<div
			class="h-[20vh] z-10 w-full pointer-events-none"
			style="background: linear-gradient(0deg, #F0F0F0 31.33%, rgba(240, 240, 240, 0.00) 134.29%); filter: blur(12.399999618530273px); position: absolute; bottom: -50px; left: 0;"
		></div>
	</div>
{/if}

<style>
	.link {
		color: currentColor; /* inherit / default text color */
		transition: color 200ms ease;
	}

	.link:hover {
		color: var(--hover-color);
	}

	.thumbnail-grid {
		grid-template-columns: repeat(4, 200px);
	}

	@media (max-width: 768px) {
		.thumbnail-grid {
			grid-template-columns: repeat(3, 100px);
		}
	}
</style>
