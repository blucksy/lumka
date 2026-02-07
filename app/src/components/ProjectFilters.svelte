<script lang="ts">
	export let tags: string[];
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let projects: any[];
	let filtersVisible = false;

	function handleTagHighlight(tag: string) {
		// if no tag url parameters return
		const urlTags = Array.from(new URLSearchParams(window.location.search).getAll('tag'));
		if (urlTags.length === 0) return 'opacity-0 md:opacity-100';

		if (urlTags.includes(tag)) {
			return 'opacity-100';
		} else {
			return 'opacity-0 md:opacity-30 hidden md:flex pointer-events-none md:pointer-events-auto';
		}
	}

	const openFilters = () => {
		filtersVisible = !filtersVisible;
	};

	function redirectToTag(tag: string) {
		// clone current URLSearchParams
		// if mobile do not redirect
		if (window.innerWidth < 768) {
			// if tag is clear break
			if (tag === 'clear') {
				goto('/projects', { invalidateAll: true });
			}
			return;
		}
		const params = new URLSearchParams($page.url.searchParams);
		const tags = params.getAll('tag');

		if (tags.includes(tag)) {
			// remove this tag
			params.delete('tag');
			tags.filter((t) => t !== tag).forEach((t) => params.append('tag', t));
		} else {
			// add tag
			params.append('tag', tag);
		}

		const queryString = params.toString();
		const url = queryString ? `/projects?${queryString}` : '/projects';

		setTimeout(() => {
			goto(url, { invalidateAll: true });
		}, 500);
	}
</script>

<nav class={`flex w-full md:w-auto `} id="project-filters">
	<button
		class={`type-sm cursor-pointer ${filtersVisible ? 'opacity-30 md:opacity-100' : 'opacity-30'}`}
		on:click={() => {
			openFilters();
		}}>Filter</button
	>
	<div
		class={`gap-2.5  pl-2.5 flex flex-row  anim-opacity ${filtersVisible ? 'opacity-100 pointer-events-auto' : 'md:opacity-0 pointer-events-none'}`}
		id="filters"
	>
		{#each tags as tag}
			<button
				class={`cursor-pointer  ${handleTagHighlight(tag.name)}`}
				aria-pressed={handleTagHighlight(tag.name) === 'opacity-100'}
				on:click={() => redirectToTag(tag.name)}
				>{tag.name}
			</button>
		{/each}
	</div>
	<div class="ml-auto md:hidden">
		<button
			class="type-sm opacity-30"
			on:click={() => {
				redirectToTag('clear');
			}}>Clear</button
		>
	</div>
	<p aria-live="polite" class="sr-only">
		Showing {projects.length} projects{new URLSearchParams($page.url.searchParams).getAll('tag')
			.length
			? ` filtered by ${new URLSearchParams($page.url.searchParams).getAll('tag').join(', ')} tag`
			: ''}.
	</p>
</nav>

<style>
	/* md:opacity-30 */
	@media (min-width: 768px) {
		.md\:opacity-30 {
			opacity: 0.3;
		}
		.md\:opacity-100 {
			opacity: 1;
		}
	}
</style>
