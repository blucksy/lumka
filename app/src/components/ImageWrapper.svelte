<script lang="ts">
	import sanitySrcset from '$lib/sanity/sanitySrcset';
	import { urlFor } from '$lib/sanity/image';
	import { onMount } from 'svelte';

	export let image: string;
	export let className: string = '';
	export let alt: string = '';
	export let srcset: number[] = [320, 480, 640, 768, 1024, 1280, 1536];
	export let href: string;
	export let crop;
	export let sizes: string = '100vw';
	export let hotspot;
	export let loading: 'eager' | 'lazy' = 'eager';
	export let objectFit: boolean;
	export let quality: number = 50;
	let imgRef;
	let newSrcSet = '';

	if (image?.hotspot) {
		hotspot = image.hotspot;
	}

	onMount(() => {
		if (imgRef?.complete) {
			imgRef.classList.add('opacity-100');
		}
		if (objectFit) {
			imgRef?.classList.add('!object-contain');
		}
	});

	$: if (typeof image === 'object') {
		if (hotspot) {
			image = urlFor(image).focalPoint(hotspot.x, hotspot.y).auto('format').quality(quality).url();
		} else {
			image = urlFor(image).auto('format').quality(quality).url();
		}
	}

	$: if (image && srcset.length > 0) {
		if (image.includes('cdn.sanity.io')) {
			newSrcSet = sanitySrcset(image, srcset);
		}
	}

	const generateHotspotInlineStyle = () => {
		if (hotspot) {
			return `object-position: ${hotspot?.x * 100}% ${hotspot?.y * 100}%`;
		} else {
			return 'object-position: center';
		}
	};
</script>

{#if image && href}
	<a
		href={href || null}
		class={`w-full h-full object-cover bg-white  bg-cover transition  ${className}`}
	>
		<img
			bind:this={imgRef}
			src={image}
			style={generateHotspotInlineStyle()}
			on:load={(e) => {
				e.currentTarget.classList.add('opacity-100');
			}}
			{alt}
			{loading}
			{sizes}
			class={`w-full opacity-0 object-cover h-full !shadow-none anim-opacity  ${className}`}
			srcset={newSrcSet}
		/>
	</a>
{:else if image}
	<img
		bind:this={imgRef}
		src={image}
		style={generateHotspotInlineStyle()}
		on:load={(e) => {
			e.currentTarget.classList.add('opacity-100');
		}}
		{loading}
		{sizes}
		{alt}
		class={`w-full opacity-0 object-cover h-full !shadow-none anim-opacity  ${className}`}
		srcset={newSrcSet}
	/>
{/if}
