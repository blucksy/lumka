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
				*:flex *:flex-col *:hover:opacity-60 *:transition-opacity
				*:gap-[18px] *sm::gap-[12px]"
>
	<a
		class="col-span-1 sm:col-span-3 sm:col-start-2 md:col-start-3 lg:col-start-4
		text-center sm:text-left"
		href={previous.link}
	>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Previous</p>
		</div>
		<p class="body">{previous.title}</p>
		<p class="small-sans whitespace-pre-line">{previous.details}</p>
	</a>
	<a
		class="col-span-1 sm:col-span-3 sm:col-start-12 md:col-start-11 lg:col-start-10
		text-center sm:text-right"
		href={next.link}
	>
		<div class="pb-[6px] sm:pb-0">
			<p class="small-serif small-caps">Next</p>
		</div>
		<p class="body">{next.title}</p>
		<p class="small-sans whitespace-pre-line">{next.details}</p>
	</a>
</div>
