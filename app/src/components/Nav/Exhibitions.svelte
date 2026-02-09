<script>
	import formatDate from '$lib/utils/formatDate';
	import { slide } from 'svelte/transition';

	export let exhibitions;
</script>

<div transition:slide class="px-[12px] py-[18px]">
	{#each exhibitions as exhibition}
		<a
			class="grid grid-cols-3 gap-[12px] hover:italic"
			href={`/exhibitions/${exhibition.slug.current}`}
		>
			<div class="col-span-2">
				<div>
					{exhibition.title}
				</div>
				<div class="pl-[24px]">
					<p class="text-balance">{exhibition.artists.join(', ')}</p>
					<p>{formatDate(exhibition.startDate, exhibition.endDate)}</p>
				</div>
			</div>
		</a>
	{/each}
</div>
