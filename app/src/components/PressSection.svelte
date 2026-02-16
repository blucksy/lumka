<script>
	import Anchor from './Anchor.svelte';
	import Press from './Press.svelte';

	export let pressItems;
</script>

<Anchor title="Press">
	<div class="main-grid">
		<div
			class="
			col-span-8 col-start-2 sm:col-span-13 sm:col-start-2 md:col-span-11 md:col-start-3 lg:col-span-9 lg:col-start-4
			flex flex-col gap-[48px]"
		>
			{#each pressItems as press}
				<Press item={press} />
			{/each}
		</div>
	</div>
</Anchor>
