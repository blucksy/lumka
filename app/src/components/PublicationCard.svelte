<script>
	import ImageWrapper from './ImageWrapper.svelte';
	import { PortableText } from '@portabletext/svelte';
	export let publication;
</script>

<a href={publication.link} class="col-span-9 col-start-4" target="_blank" rel="noopener noreferrer">
	<div class="flex flex-col gap-[var(--m)] mx-auto">
		<ImageWrapper image={publication.image} alt={publication.title} class="w-full h-auto" />
		<p class="text-center">{publication.category}</p>
		<div class="text-center type-link-serif">
			<PortableText value={publication.title} />
		</div>
		<div class="child:text-center">
			<PortableText value={publication.subtitle} />
		</div>
		<div class="text-center w-min">
			<PortableText value={publication.description} />
		</div>
	</div>
</a>
