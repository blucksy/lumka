<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { useQuery } from '@sanity/svelte-loader';
	import Tags from '../../../components/Tags.svelte';

	export let data;
	const q = useQuery(data);

	let show;

	$: ({ data: show } = $q);

	$: console.log(show);
</script>

<Tags
	title={show?.title || 'Exhibition'}
	image={show?.exhibitionImage
		? urlFor(show.exhibitionImage.asset).width(1600).quality(100).auto('format').url()
		: ''}
/>

<div class="pt-[96px] flex flex-col gap-[144px] items-center">
	<h1 class="title">{show?.title}</h1>
</div>
