<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { urlFor } from '$lib/sanity/image';
	import ImageWrapper from '../components/ImageWrapper.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { onDestroy } from 'svelte';
	import Tags from '../components/Tags.svelte';
	import { browser } from '$app/environment';
	export let data: PageData;
	const q = useQuery(data);
	$: isDesktop = false;

	onMount(() => {
		isDesktop = true;
	});

	$: ({ data: settings } = $q);
	$: homepage = settings?.homepage ?? [];

	let currentIndex = 0;
	// auto advance every 7 seconds. if user interacts, reset timer
	let interval = setInterval(() => {
		increaseIndex();
	}, 3000);
	function increaseIndex() {
		currentIndex += 1;
	}
	function decreaseIndex() {
		currentIndex -= 1;
	}

	$: if (currentIndex < 0) {
		currentIndex = homepage.length - 1;
	}
	$: if (currentIndex >= homepage.length) {
		currentIndex = 0;
	}
	$: if (homepage?.length) {
		const activeColor = homepage[currentIndex]?.color?.hex;
		if (activeColor && typeof document !== 'undefined') {
			requestAnimationFrame(() => {
				let meta = document.querySelector('meta[name="theme-color"]');
				if (!meta) {
					meta = document.createElement('meta');
					meta.setAttribute('name', 'theme-color');
					document.head.appendChild(meta);
				}
				meta.setAttribute('content', activeColor);
			});
		}
	}
	// on page leave remove theme color
	beforeNavigate(() => {
		if (typeof document !== 'undefined') {
			let meta = document.querySelector('meta[name="theme-color"]');
			if (meta) {
				meta.setAttribute('content', '#F0F0F0');
			}
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
			clearInterval(interval);
		}

		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			decreaseIndex();
			clearInterval(interval);
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<Tags
	title="Home"
	image={homepage?.[0]?.content?.[0]?.asset
		? urlFor(homepage[0].content[0].asset).auto('format').url()
		: ''}
/>
<section>
	{#each homepage as item, i}
		<div
			in:fade
			class={` absolute mobile-grid md:flex! justify-center items-center top-0 left-0 w-screen dynamic-h-screen opacity-0  ${
				i === currentIndex ? 'opacity-100 ' : ''
			}`}
			style={`background-color: ${item.color.hex}`}
		>
			{#if isDesktop}
				<a
					in:fade={{ duration: 350, easing: cubicInOut }}
					class={`z-20 group col-span-10 col-start-2
				${i === currentIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
					href={`/projects/${item.slug.current}`}
				>
					<p
						class="left-12.5 type-lg font-medium bottom-5 absolute opacity-0 anim-opacity group-hover:opacity-100"
					>
						{item.title}
					</p>
					<ImageWrapper
						className={`!h-auto md:!h-[67vh] !w-auto  opacity-0  pointer-events-none transition-opacity `}
						image={item.content[0].asset}
						alt={item.content[0].alt || item.title}
						quality={100}
						sizes="(min-width: 650px) 1000px, 100vw"
						srcset={[1024, 1600]}
					/>
				</a>
			{/if}

			<button
				class="fixed left-0 h-screen z-10 w-[50vw]"
				on:click={() => {
					decreaseIndex();
					clearInterval(interval);
				}}
			></button>
			<button
				class="fixed right-0 h-screen z-10 w-[50vw]"
				on:click={() => {
					increaseIndex();
					clearInterval(interval);
				}}
			></button>
		</div>
	{/each}
</section>
