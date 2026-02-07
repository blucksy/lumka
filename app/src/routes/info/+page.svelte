<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { PortableText } from '@portabletext/svelte';
	import Tags from '../../components/Tags.svelte';
	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: settings } = $q);

	// onmount make it opacity-100
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { infoQuery } from '$lib/sanity/queries';
	afterNavigate(() => {
		const infoPage = document.getElementById('info-page');
		if (infoPage) {
			infoPage.classList.remove('opacity-0');
			infoPage.classList.add('opacity-100');
		}
	});
</script>

<Tags title={'Info'} />
<div
	class={`anim-opacity pt-nav mt-7.5 md:mt-15 md:grid md:grid-cols-12 gap-5 opacity-0`}
	id="info-page"
>
	<div class="col-span-5">
		<div class="type-lg">
			<p class="section-title">Biography</p>
			<div class="section-body">
				<PortableText value={settings.biography} />
			</div>
		</div>
		<div class="type-lg pt-15 md:pt-20">
			<p class="section-title">Contact</p>
			<div class="section-body flex flex-col gap-10">
				<PortableText value={settings.contact} />
			</div>
		</div>
	</div>
	<div class="col-span-3 col-start-7 type-lg pt-[60px] md:pt-0">
		<p class="section-title">Fellowships, Honors & Awards</p>
		<div class="section-body flex flex-col gap-10">
			<PortableText value={settings.fellowshipHonorsAwards} />
		</div>
	</div>
	<div class="col-span-3 col-start-10 flex flex-col gap-15 md:gap-20 pt-[60px] md:pt-0">
		<div class="type-lg">
			<p class="section-title">Selected Publications & Clients</p>
			<div class="section-body">
				<PortableText value={settings.selectedPublicationsClients} />
			</div>
		</div>
		<div class="type-lg">
			<p class="section-title">Selected Press</p>
			<div class="section-body">
				<PortableText value={settings.selectedPress} />
			</div>
		</div>

		<div class="type-lg">
			<p class="section-title">Exhibitions</p>
			<div class="section-body">
				<PortableText value={settings.exhibitions} />
			</div>
		</div>
	</div>
</div>
<div class=" pt-[60px] md:pt-0 pb-5 flex flex-col justify-between w-full">
	<img src="/footer-logo.svg" alt="LUmkA Logo" class="h-7.5 w-min mb-5" />
	<p class="type-sm">© {new Date().getFullYear()} All Rights Reserved</p>
	<p class="type-sm md:w-1/2 text-balance">
		Web Design by <a href="https://arianagupta.com" target="_blank" rel="noopener noreferrer"
			>Ariana Gupta</a
		>
		and Web Development by
		<a href="https://taw.vision" target="_blank" rel="noopener noreferrer">taw vision</a>
	</p>
</div>
