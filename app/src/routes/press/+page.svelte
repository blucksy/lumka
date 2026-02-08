<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import Quote from '../../components/Quote.svelte';
	import Tags from '../../components/Tags.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
	const q = useQuery(data);

	$: ({ data: press } = $q);

	$: console.log(press);
</script>

<Tags title={'Press'} />

<div class="py-[96px] flex flex-col gap-[96px]">
	{#each press as item}
		<div class="px-page main-grid">
			<a
				href={item.pdf ? item.pdf : item.link}
				target="_blank"
				rel="noopener noreferrer"
				class="col-span-8 col-start-2 md:col-span-11 md:col-start-3 text-center flex flex-col gap-[18px] md:gap-[24px]"
			>
				<p class="mobile-link md:title">
					<PortableText
						value={item.title}
						components={{
							block: {
								normal: Quote
							}
						}}
					/>
				</p>
				<p class="sans">
					{item.author ? `${item.author}, ${item.publication}` : item.publication}
					<br />{formatDate(item.date)}
				</p>
			</a>
		</div>
	{/each}
</div>
