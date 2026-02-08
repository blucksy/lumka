<script>
	import { slide } from 'svelte/transition';

	export let about;
	export let announcement;
</script>

<div transition:slide class="px-[12px] py-[18px] flex flex-col gap-[18px]">
	<div class="small-sans *:opacity-60 *:hover:opacity-100 *:transition-opacity flex gap-[9px]">
		<a href="https://www.instagram.com/l_u_m_k_a" target="_blank" rel="noopener noreferrer"
			>Instagram</a
		>
		<button>Newsletter</button>
		<a href="mailto:info@lumka.com">Contact</a>
	</div>
	<div>{about}</div>
	{#if announcement}
		<div class="flex gap-[12px]">
			<div class="small-caps opacity-60">Announcement</div>
			<div>{announcement}</div>
		</div>
	{/if}
</div>
