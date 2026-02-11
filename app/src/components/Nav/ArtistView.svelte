<script>
	import { slide } from 'svelte/transition';

	export let represented;
	export let exhibited;
</script>

<div transition:slide class="px-[12px] py-[18px] grid grid-cols-3 gap-[12px]">
	<div class="col-span-2 flex flex-col gap-[18px]">
		<div>
			<p class="small-caps opacity-60 small-serif small-caps">Represented</p>
			<div class="mt-[12px] flex flex-wrap gap-[12px]">
				{#each represented as artist}
					<a href={`/artists/${artist.slug.current}`} class="hover:italic small-serif"
						>{artist.title}</a
					>
				{/each}
			</div>
		</div>
		<div>
			<p class="small-caps opacity-60 small-serif small-caps">Exhibited</p>
			<div class="mt-[12px] flex flex-wrap gap-[12px]">
				{#each exhibited as artist}
					<a href={`/artists/${artist.slug.current}`} class="hover:italic small-serif"
						>{artist.title}</a
					>
				{/each}
			</div>
		</div>
	</div>
</div>
