<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import ImageWrapper from '../../components/ImageWrapper.svelte';
	import ProjectFilters from '../../components/ProjectFilters.svelte';
	import { cubicInOut } from 'svelte/easing';
	export let data: PageData;
	$: q = useQuery(data);

	let isDesktop: boolean | null = null;

	let desktopGridSize = 5; // user preference (desktop)
	let gridFading = false;

	const gridPresets = {
		7: { w: 100, gap: 100 },
		5: { w: 200, gap: 100 },
		3: { w: 300, gap: 200 }
	} as const;

	onMount(() => {
		const mq = window.matchMedia('(min-width: 768px)');
		const update = () => (isDesktop = mq.matches);

		update();
		mq.addEventListener('change', update);

		gridFading = false; // <-- move here

		return () => mq.removeEventListener('change', update);
	});

	$: ({ data: baseProjects } = $q);
	$: tags = baseProjects?.allTags ?? [];
	$: projects = baseProjects.projects ?? [];
	// effective values
	$: effectiveGridSize = isDesktop ? desktopGridSize : 3;
	$: ({ w: itemW, h: itemH, gap } = gridPresets[desktopGridSize]); // preset tied to desktop choice
	$: cellW = isDesktop ? itemW : 100;

	$: gridStyle = `
  grid-template-columns: repeat(${effectiveGridSize}, minmax(0, ${cellW}px));
  ${isDesktop ? `gap: clamp(16px, 4vw, ${gap}px);` : 'gap:30px 15px'};
`;
	async function setGrid(size: number) {
		// desktop-only behavior

		gridFading = true;
		setTimeout(() => {
			desktopGridSize = size;
		}, 500);
		setTimeout(async () => {
			await tick();
			gridFading = false;
		}, 625);
	}

	// before navigate fade out
	beforeNavigate(() => {
		gridFading = true;
	});

	afterNavigate(() => {
		setTimeout(() => {
			gridFading = false;
		}, 500);
	});

	let gridVisible = false;
</script>

{#if isDesktop !== null}
	<div class="pt-nav" in:fade={{ duration: 350, easing: cubicInOut }}>
		<div
			class={`md:pt-15 pt-5 type-sm  md:pb-10 type-sm flex flex-row justify-between ${
				$page.url.searchParams.getAll('tag').length === 0 ? 'hidden md:flex' : ''
			}`}
		>
			<ProjectFilters {tags} {projects} />
			<nav class="hidden md:flex" aria-labelledby="grid-heading">
				<div class={`gap-2.5 pl-2.5 flex flex-row overflow-hidden `}>
					<button
						on:click={() => setGrid(7)}
						class="opacity-30 cursor-pointer"
						aria-pressed={desktopGridSize === 7}
						class:active={desktopGridSize === 7}>Small</button
					>
					<button
						on:click={() => setGrid(5)}
						class="opacity-30 cursor-pointer"
						aria-pressed={desktopGridSize === 5}
						class:active={desktopGridSize === 5}>Medium</button
					>
					<button
						on:click={() => setGrid(3)}
						class="opacity-30 cursor-pointer"
						aria-pressed={desktopGridSize === 3}
						class:active={desktopGridSize === 3}>Large</button
					>
				</div>
			</nav>
		</div>

		<div
			id="projects-grid"
			class={`pb-12.5 md:pb-25 grid w-full justify-between pt-5 md:pt-0  md:gap-y-[inherit] anim-opacity ${gridFading ? 'opacity-0' : 'opacity-100'}`}
			style={gridStyle}
		>
			{#each projects as project}
				{@const randomIndex = Math.floor(Math.random() * project.content.length)}
				<a
					on:click={() => {
						// wait 300ms then navigate
						gridFading = true;
						setTimeout(() => {
							goto(`/projects/${project.slug}`);
						}, 500);
					}}
					class="relative cursor-pointer cell"
				>
					<div
						class="hidden md:block anim-opacity absolute opacity-0 hover:opacity-100 top-0 left-0 w-full h-full bg-white z-10"
						style={`background-color:${project.color};`}
					></div>
					<ImageWrapper
						image={project.content[randomIndex].asset}
						alt={project.content[randomIndex].alt || project.title}
						sizes={`${cellW * 1.8}px`}
						quality={90}
						srcset={[128, 256, 384, 512]}
					/>
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	button.active {
		opacity: 1;
		font-weight: 600;
	}
	/* each grid item fills its track, but caps at preset sizes */
	.cell {
		width: 100%;
		max-width: var(--cellW);
		aspect-ratio: 4 / 5; /* matches 100x125 etc */
		overflow: hidden; /* prevents any child overflow */
	}

	/* make sure wrapper/media can't bust out */
	.cell :global(img),
	.cell :global(picture),
	.cell :global(video),
	.cell :global(canvas) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
