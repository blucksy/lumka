<script lang="ts">
	export let next: TabInfo;
	export let previous: TabInfo;

	interface TabInfo {
		link: string;
		title: string;
		details: string;
	}
</script>

<div
	class="col-span [--span:20] md:[--span:18] lg:[--span:14] mx-auto flex justify-between flex-col sm:flex-row gap-[96px] sm:gap-[24px]
				*:flex *:flex-col *:hover:opacity-60 *:anim-opacity *:flex-1
				*:gap-[18px] *sm::gap-[12px]"
>
	<a class="text-center sm:text-left text-balance" href={previous.link}>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Next</p>
		</div>
		<p class="body">{previous.title}</p>
		{#if previous.details}
			<p class="small-sans whitespace-pre-line">{previous.details}</p>
		{/if}
	</a>
	<a class="text-center sm:text-right text-balance" href={next.link}>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Previous</p>
		</div>
		<p class="body">{next.title}</p>
		{#if next.details}
			<p class="small-sans whitespace-pre-line">{next.details}</p>
		{/if}
	</a>
</div>
