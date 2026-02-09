<script lang="ts">
	import formatDate from '$lib/utils/formatDate';
	import { PortableText } from '@portabletext/svelte';
	import clsx from 'clsx';
	import Quote from './Quote.svelte';

	export let item;
	export let pressPage = false;
</script>

<a
	href={item.link}
	target="_blank"
	rel="noopener noreferrer"
	class={clsx('text-center flex flex-col gap-[18px] ', pressPage && 'sm:gap-[24px]')}
>
	<p class={clsx(pressPage ? 'sm:title' : 'sm:link-serif', 'mobile-link')}>
		<PortableText
			value={item.title}
			components={{
				block: {
					normal: Quote
				}
			}}
		/>
	</p>
	<p class="sans">
		{item.author ? `${item.author}, ${item.publication}` : item.publication}
		<br />{formatDate(item.date)}
	</p>
</a>
