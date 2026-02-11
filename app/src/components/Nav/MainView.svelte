<script>
	import { slide } from 'svelte/transition';
	import Newsletter from '../Newsletter.svelte';

	export let about;
	export let announcement;

	let newsletter = false;
</script>

<div transition:slide class="px-[12px] py-[18px]">
	{#if newsletter}
		<div transition:slide class="flex flex-col gap-[18px]">
			<p class="small-sans">
				For a behind-the-scenes look at our gallery, news about exhibitions, artists, projects,
				along with a word from our editor, subscribe to LUmkA’s newsletter:
			</p>
			<div class="text-center">
				<Newsletter />
			</div>
		</div>
	{:else}
		<div transition:slide class="flex flex-col gap-[18px]">
			<div
				class="small-sans *:opacity-60 *:hover:opacity-100 *:cursor-pointer *:transition-opacity flex gap-[9px]"
			>
				<a href="https://www.instagram.com/l_u_m_k_a" target="_blank" rel="noopener noreferrer"
					>Instagram</a
				>
				<button on:click={() => (newsletter = true)}>Newsletter</button>
				<a href="mailto:info@lumka.com">Contact</a>
			</div>
			<div class="small-serif">{about}</div>
			{#if announcement}
				<div class="flex gap-[12px]">
					<div class="small-caps small-serif opacity-60">Announcement</div>
					<div class="small-serif">{announcement}</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
