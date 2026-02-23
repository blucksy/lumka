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
	class="main-grid grid-cols-1! sm:grid-cols-15! w-full gap-[96px]! sm:gap-[24px]! items-center w-full
				*:flex *:flex-col *:hover:opacity-60 *:anim-opacity
				*:gap-[18px] *sm::gap-[12px]"
>
	<a
		class="col-span-1 sm:col-span-4 sm:col-start-2 md:col-start-3 lg:col-start-4 2xl:col-start-5 2xl:col-span-3
		text-center sm:text-left"
		href={previous.link}
	>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Next</p>
		</div>
		<p class="body">{previous.title}</p>
		{#if previous.details}
			<p class="small-sans whitespace-pre-line">{previous.details}</p>
		{/if}
	</a>
	<a
		class="col-span-1 sm:col-span-4 sm:col-start-11 md:col-start-10 lg:col-start-9 2xl:col-start-8
		text-center sm:text-right"
		href={next.link}
	>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Previous</p>
		</div>
		<p class="body">{next.title}</p>
		{#if next.details}
			<p class="small-sans whitespace-pre-line">{next.details}</p>
		{/if}
	</a>
</div>
