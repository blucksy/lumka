<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Press from '../../components/Press.svelte';
	import Tags from '../../components/Tags.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { afterNavigate } from '$app/navigation';
	export let data: PageData;

	console.log(data);
	const q = useQuery(data);

	$: ({ data: press } = $q);
	$: loaded = false;
	afterNavigate(() => {
		loaded = true;
	});

	$: console.log(press);
</script>

<Tags title={'Press'} />

<div
	class={`opacity-0  py-[48px] sm:py-[96px] flex flex-col gap-[48px] sm:gap-[96px] anim-opacity  ${loaded ? 'opacity-100' : ''}`}
>
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
