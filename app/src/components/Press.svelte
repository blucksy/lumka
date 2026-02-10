<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import clsx from 'clsx';
	import TextRotate from './Text/TextRotate.svelte';

	export let item;
	export let pressPage = false;
</script>

<a
	href={item.link}
	target="_blank"
	rel="noopener noreferrer"
	class={clsx('text-center flex flex-col gap-[18px] group', pressPage && 'sm:gap-[24px]')}
>
	<p class={clsx(pressPage ? 'sm:title' : 'sm:link-serif', 'mobile-link')}>
		“<TextRotate item={item.title} />”
	</p>
	<p class="sans">
		{item.author ? `${item.author}, ${item.publication}` : item.publication}
		<br />{formatDate(item.date)}
	</p>
</a>
