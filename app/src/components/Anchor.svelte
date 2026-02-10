<script>
	export let title;
</script>

<div class="flex flex-col gap-[24px] sm:gap-[48px]">
	<p class="small-caps small-serif text-center" id={title.toLowerCase()}>{title}</p>

	<slot />
</div>
