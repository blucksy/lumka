<script>
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';
	import { PortableText } from '@portabletext/svelte';
	export let text;
</script>

<div class="main-grid">
	<div
		class="col-span-10 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4 *:mobile-body sm:*:body *:indent-[48px] *:first:indent-0 flex flex-col gap-[24px]"
	>
		<PortableText value={removeEmptyPortableTextBlocks(text)} />
	</div>
</div>
