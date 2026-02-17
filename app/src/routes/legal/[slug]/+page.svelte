<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Tags from '../../../components/Tags.svelte';
	import Body from '../../../components/Text/Body.svelte';

	export let data;
	const q = useQuery(data);

	let legal;

	$: ({ data: legal } = $q);

	$: console.log(legal);
</script>

<Tags title={legal?.title || 'Legal'} />

<div class="sm:pb-[144px] py-[96px] items-center px-page">
	<h1 class="title italic text-center">{legal?.title}</h1>
	<div class="mt-[96px]">
		<Body text={legal?.content} />
	</div>
	<div class="mt-[96px] sm:mt-[144px] flex items-center">
		<a href="/" class="hover:opacity-60 anim-opacity w-fit mx-auto sans">Return to Home</a>
	</div>
</div>
