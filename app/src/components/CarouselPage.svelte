<script lang="ts">
	import { goto } from '$app/navigation';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Mousewheel } from 'swiper/modules';
	import Tabber from './Tabber.svelte';

	import 'swiper/css';
	import 'swiper/css/mousewheel';

	export let items: any[];
	export let currentSlug: string;
	export let routeBase: string; // e.g., '/artists' or '/exhibitions'
	export let getDetails: (item: any) => string;

	let swiper;
	let currentItem;

	$: currentItem = items?.find((item) => item.slug.current === currentSlug);

	onMount(() => {
		const initialIndex = items?.findIndex((item) => item.slug.current === currentSlug) || 0;
		swiper = new Swiper('.swiper', {
			modules: [Mousewheel],
			loop: true,
			speed: 750,
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			mousewheel: {
				forceToAxis: true
			},
			initialSlide: initialIndex,
			autoHeight: true
		});

		swiper.on('slideChange', () => {
			const realIndex = swiper.realIndex;
			const item = items[realIndex];
			if (item && item.slug.current !== currentItem?.slug.current) {
				currentItem = item;
				goto(`${routeBase}/${item.slug.current}`, { replaceState: true, noScroll: true });
			}
		});

		const zoom = mediumZoom('[data-zoomable]', {
			margin: 24,
			background: 'rgba(256, 256, 256, 0.75)',
			scrollOffset: 0
		});

		return () => {
			zoom.detach();
		};
	});

	let next, previous;
	$: {
		const currentIndex = items?.findIndex((item) => item.slug.current === currentSlug) ?? -1;
		next = currentIndex < items.length - 1 ? items[currentIndex + 1] : items[0];
		previous = currentIndex > 0 ? items[currentIndex - 1] : items[items.length - 1];
	}
</script>

<div class="py-[96px] flex flex-col gap-[144px] items-center px-page">
	<!-- Carousel -->
	<div
		class="swiper w-screen -mx-[36px]! -my-[18px] relative"
		role="region"
		aria-roledescription="carousel"
	>
		<div
			class="bottom-0 absolute h-[18px] w-screen left-0 bg-linear-to-t from-white to-transparent z-10"
		></div>
		<div class="swiper-wrapper will-change-transform">
			{#each items as item, i}
				<div
					id="slide-{i}"
					class="swiper-slide w-fit! [&:not(.swiper-slide-active)]:*:opacity-20 [&:not(.swiper-slide-active)]:*:pointer-events-none lg:[--span:1]! py-[18px]"
					aria-hidden={item.slug.current !== currentItem?.slug.current}
				>
					<div
						class="col-span [--span:13] md:[--span:11] lg:[--span:9] transition-opacity duration-500"
					>
						<slot name="slide" {item} />
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Page Content -->
	<slot name="content" {currentItem} />

	<!-- Return to Top -->
	<div class="flex items-center">
		<button
			aria-label="Scroll back to top"
			on:click={() => {
				window.scrollTo({ behavior: 'smooth', top: 0 });
			}}
			class="hover:opacity-60 transition-opacity w-fit mx-auto sans cursor-pointer"
			>Return to Top</button
		>
	</div>

	<!-- Navigation -->
	<Tabber
		next={{
			link: routeBase + '/' + next?.slug.current,
			title: next?.title,
			details: getDetails(next)
		}}
		previous={{
			link: routeBase + '/' + previous?.slug.current,
			title: previous?.title,
			details: getDetails(previous)
		}}
	/>
</div>
