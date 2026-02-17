<script>
	import formatDate from '$lib/utils/formatDate';
	import clsx from 'clsx';
	import { tick } from 'svelte';
	import Halftone from '../Halftone.svelte';

	export let exhibitions = [];
	export let recalcHeight;

	let current = '';

	const today = new Date();

	function getStatus(exhibition) {
		const start = new Date(exhibition.startDate);
		const end = new Date(exhibition.endDate);

		if (start > today) return 'forthcoming';
		if (end < today) return 'previous';
		return 'onView';
	}

	$: withStatus = (exhibitions ?? []).map((e) => ({
		...e,
		status: getStatus(e)
	}));

	$: statuses = new Set(withStatus.map((e) => e.status));

	// Determine if we should show filters
	$: showFilter = statuses.size > 1 && !(statuses.size === 1 && statuses.has('previous'));

	// Set default filter intelligently
	$: if (!current && showFilter) {
		if (statuses.has('onView')) current = 'onView';
		else if (statuses.has('forthcoming')) current = 'forthcoming';
		else current = 'previous';
	}

	$: if (current) {
		tick().then(() => {
			recalcHeight();
		});
	}

	$: filtered =
		!showFilter || !current ? withStatus : withStatus.filter((e) => e.status === current);
</script>

<div class="px-[12px] py-[18px] flex flex-col gap-[24px] sm:gap-[18px]">
	{#if showFilter}
		<div
			class="flex gap-[12px]
*:small-sans *:opacity-60 *:aria-pressed:opacity-100 *:transition-opacity *:hover:opacity-100 *:cursor-pointer *:aria-pressed:cursor-default"
		>
			{#if statuses.has('forthcoming')}
				<button on:click={() => (current = 'forthcoming')} aria-pressed={current === 'forthcoming'}>
					Forthcoming
				</button>
			{/if}

			{#if statuses.has('onView')}
				<button on:click={() => (current = 'onView')} aria-pressed={current === 'onView'}>
					On View
				</button>
			{/if}

			{#if statuses.has('previous')}
				<button on:click={() => (current = 'previous')} aria-pressed={current === 'previous'}>
					Previous
				</button>
			{/if}
		</div>
	{/if}
	<div class="flex flex-col gap-[18px]">
		{#each filtered as exhibition}
			<div class={clsx('w-full group relative', filtered.length === 1 && 'sm:pb-[18px]')}>
				<a
					href={`/exhibitions/${exhibition.slug.current}`}
					class="w-fit sm:max-w-[calc((100%-24px)/3*2+12px)] block hover:italic peer mobile-small-serif sm:small-serif"
				>
					<div>{exhibition.title}</div>
					<div class="pl-[24px]">
						<p class="text-balance">{exhibition.artists.join(', ')}</p>
						<p>{formatDate(exhibition.startDate, exhibition.endDate)}</p>
					</div>
				</a>

				{#if exhibition.image}
					<div
						class={clsx(
							'hidden sm:block absolute right-[12px] w-[calc((100%-24px)/3)] -translate-y-1/2 top-1/2 group-first:translate-y-0 group-first:top-0 opacity-0 peer-hover:opacity-100 transition-opacity mix-blend-multiply',
							filtered.length > 1
								? 'group-last:bottom-0 group-last:translate-y-0 group-last:top-auto'
								: 'top-0 bottom-0 *:h-full *:*:h-full *:*:*:h-full'
						)}
					>
						<Halftone src={exhibition.image} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
