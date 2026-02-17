<script>
	export let about;
	export let announcement;
	export let toggleTab;
</script>

<div class="px-[12px] py-[18px] flex flex-col gap-[18px]">
	<div
		class="small-sans *:opacity-60 *:hover:opacity-100 *:cursor-pointer *:transition-opacity flex gap-[9px]"
	>
		<a href="https://www.instagram.com/l_u_m_k_a" target="_blank" rel="noopener noreferrer"
			>Instagram</a
		>
		<button
			on:click={() => {
				toggleTab('newsletter');
				setTimeout(() => {
					document.getElementById('email')?.focus();
				}, 50);
			}}>Newsletter</button
		>
		<a href="mailto:info@lumka.com">Contact</a>
	</div>
	<div class="mobile-small-serif sm:small-serif">{about}</div>
	{#if announcement}
		<div class="flex gap-[12px]">
			<div class="small-caps mobile-small-serif sm:small-serif opacity-60">Announcement</div>
			<div class="mobile-small-serif sm:small-serif">{announcement}</div>
		</div>
	{/if}
</div>
