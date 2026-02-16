<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Press from '../../components/Press.svelte';
	import Tags from '../../components/Tags.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
	const q = useQuery(data);

	$: ({ data: press } = $q);

	$: console.log(press);
</script>

<Tags title={'Press'} />

<div class="py-[48px] sm:py-[96px] flex flex-col gap-[48px] sm:gap-[96px]">
	{#each press as item}
		<div class="px-page main-grid">
			<div
				class="col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 lg:col-span-11 lg:col-start-3"
			>
				<Press {item} pressPage={true} />
			</div>
		</div>
	{/each}
</div>
