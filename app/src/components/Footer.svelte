<script>
	import Newsletter from './Newsletter.svelte';

	export let data;
	console.log(data);

	const socials = [
		{ name: 'Instagram', url: 'https://instagram.com/l_u_m_k_a' },
		{ name: 'info@lumka.com', url: 'mailto:info@lumka.com' }
	];
</script>

<div class="bg-[#ededed] main-grid px-page py-[24px] hidden! md:grid!">
	<div class="sm:col-span-7 md:col-span-6 lg:col-span-5 flex flex-col justify-between">
		<div class="small-serif">
			{data?.settings?.about}
		</div>
		<div class="flex flex-col gap-[12px]">
			<div class="flex gap-[9px]">
				{#each socials as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:opacity-100 opacity-60 transition-opacity small-sans">{social.name}</a
					>
				{/each}
			</div>
			<div class="flex gap-[9px]">
				<p class="opacity-60 small-sans">© {new Date().getFullYear()} LUmkA</p>
				{#each data?.legal || [] as legal}
					<a
						href="/legal/{legal.slug.current}"
						class="hover:opacity-100 opacity-60 transition-opacity small-sans">{legal.title}</a
					>
				{/each}
			</div>
		</div>
	</div>

	<div
		class="sm:col-span-7 md:col-span-6 lg:col-span-5 sm:col-start-9 md:col-start-10 lg:col-start-11 flex flex-col gap-[96px] items-end"
	>
		<div class="text-right flex flex-col gap-[18px]">
			<div class="small-serif">
				For a behind-the-scenes look at our gallery, news about exhibitions, artists, projects,
				along with a word from our editor, subscribe to LUmkA’s newsletter:
			</div>
			<div class="gap-[24px] grid sm:grid-cols-7 md:grid-cols-6 lg:grid-cols-5">
				<div class="col-span-full lg:col-span-4 lg:col-start-2!">
					<Newsletter />
				</div>
			</div>
		</div>

		<a
			href="https://taw.vision"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:opacity-100 opacity-60 transition-opacity small-sans">Site Credit</a
		>
	</div>
</div>

<!-- Mobile Footer -->
<div id="footer" class="bg-[#ededed] flex flex-col gap-[48px] px-page py-[18px] md:hidden!">
	<div class="flex flex-col gap-[18px]">
		<div class="small-serif">
			For a behind-the-scenes look at our gallery, news about exhibitions, artists, projects, along
			with a word from our editor, subscribe to LUmkA’s newsletter:
		</div>
		<div class="sm:text-center">
			<Newsletter />
		</div>
	</div>

	<div class="flex gap-[12px] *:flex-1 *:flex *:flex-col *:gap-[18px]">
		<div class="">
			{#each socials as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:opacity-100 opacity-60 transition-opacity small-sans w-fit">{social.name}</a
				>
			{/each}
		</div>

		<div class="">
			{#each data?.legal || [] as legal}
				<a
					href="/legal/{legal.slug.current}"
					class="hover:opacity-100 opacity-60 transition-opacity small-sans w-fit">{legal.title}</a
				>
			{/each}
		</div>
	</div>

	<div class="flex gap-[12px] *:flex-1 *:flex *:flex-col *:gap-[18px]">
		<div>
			<a
				href="https://taw.vision"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:opacity-100 opacity-60 transition-opacity small-sans w-fit">Site Credit</a
			>
		</div>
		<p class="opacity-60 small-sans">© {new Date().getFullYear()} LUmkA</p>
	</div>
</div>
