<script>
	import Anchor from './Anchor.svelte';
	import MediaEntry from './MediaEntry.svelte';

	export let works;
</script>

<Anchor title="Works">
	<div class="flex flex-col gap-[96px]">
		{#each works ?? [] as work}
			<MediaEntry entry={work} />
		{/each}
	</div>
</Anchor>
