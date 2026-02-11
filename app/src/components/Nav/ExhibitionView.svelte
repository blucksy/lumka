<script>
	import formatDate from '$lib/utils/formatDate';
	import Halftone from '../Halftone.svelte';

	export let exhibitions;
</script>

<div class="px-[12px] py-[18px] flex flex-col gap-[18px]">
	{#each exhibitions ?? [] as exhibition}
		<div class=" w-full group relative">
			<a
				href={`/exhibitions/${exhibition.slug.current}`}
				class="w-fit max-w-[calc((100%-24px)/3*2+12px)] block hover:italic peer small-serif"
			>
				<div class="">{exhibition.title}</div>
				<div class="pl-[24px]">
					<p class="text-balance">{exhibition.artists.join(', ')}</p>
					<p>{formatDate(exhibition.startDate, exhibition.endDate)}</p>
				</div>
			</a>
			{#if exhibition.image}
				<div
					class="
						absolute
						right-[12px]
						w-[calc((100%-24px)/3)]
						-translate-y-1/2
						top-1/2
						group-last:bottom-0
						group-first:top-0
						group-first:translate-y-0
						group-last:translate-y-0
						group-last:top-auto
						opacity-0 peer-hover:opacity-100 transition-opacity
						mix-blend-multiply
					"
				>
					<Halftone src={exhibition.image} />
				</div>
			{/if}
		</div>
	{/each}
</div>
