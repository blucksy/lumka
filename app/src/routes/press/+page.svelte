<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Press from '../../components/Press.svelte';
	import Tags from '../../components/Tags.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const q = useQuery(data);

	$: ({ data: press } = $q);
</script>

<Tags title={'Press'} />

<div class="py-[48px] sm:py-[96px] flex flex-col gap-[48px] sm:gap-[96px]">
	{#each press as item}
		<div class="grid grid-cols-10 gap-[12px]">
			<div
				class="col-span-8 col-start-2 sm:col-span-10 sm:col-start-1
			mx-auto sm:[--span:20] md:[--span:18] lg:[--span:16] col-span"
			>
				<Press {item} pressPage={true} />
			</div>
		</div>
	{/each}
</div>
