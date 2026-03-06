<script>
	import Anchor from './Anchor.svelte';
	import Press from './Press.svelte';

	export let pressItems;
</script>

<Anchor title="Press">
	<div class="grid grid-cols-10 gap-[12px]">
		<div
			class="col-span-8 col-start-2 sm:col-span-10 sm:col-start-1
			mx-auto sm:[--span:18] md:[--span:16] lg:[--span:12] col-span
			flex flex-col gap-[48px]"
		>
			{#each pressItems as press}
				<Press item={press} />
			{/each}
		</div>
	</div>
</Anchor>
