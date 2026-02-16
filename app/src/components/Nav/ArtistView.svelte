<script>
	import Halftone from '../Halftone.svelte';

	export let represented;
	export let exhibited;

	let hoveredArtist = '';
</script>

<div class="px-[12px] py-[18px] sm:grid grid-cols-3 gap-[12px] relative">
	<div class="col-span-2 flex flex-col gap-[24px] sm:gap-[18px]">
		<div>
			<p class="opacity-60 mobile-small-serif sm:small-serif small-caps">Represented</p>
			<div class="mt-[18px] sm:mt-[12px] flex flex-wrap gap-[18px] sm:gap-[12px]">
				{#each represented ?? [] as artist}
					<a
						href={`/artists/${artist.slug.current}`}
						class="hover:italic mobile-body sm:small-serif"
						on:mouseenter={() => (hoveredArtist = artist.slug.current)}
						on:mouseleave={() => (hoveredArtist = '')}>{artist.title}</a
					>
				{/each}
			</div>
		</div>
		<div>
			<p class="opacity-60 mobile-small-serif sm:small-serif small-caps">Exhibited</p>
			<div class="mt-[18px] sm:mt-[12px] flex flex-wrap gap-[18px] sm:gap-[12px]">
				{#each exhibited ?? [] as artist}
					<a
						href={`/artists/${artist.slug.current}`}
						class="hover:italic mobile-body sm:small-serif"
						on:mouseenter={() => (hoveredArtist = artist.slug.current)}
						on:mouseleave={() => (hoveredArtist = '')}>{artist.title}</a
					>
				{/each}
			</div>
		</div>
	</div>

	{#each [...(represented ?? []), ...(exhibited ?? [])] as artist}
		{#if artist.image}
			<div
				class="hidden sm:block aria-hidden:opacity-0 absolute top-[18px] bottom-[18px] right-[12px] w-[calc((100%-24px)/3)] transition-opacity mix-blend-multiply
					*:h-full *:*:h-full *:*:*:h-full"
				aria-hidden={hoveredArtist !== artist.slug.current}
			>
				<Halftone src={artist.image} />
			</div>
		{/if}
	{/each}
</div>
