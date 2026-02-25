<script>
	export let href;
	export let className = '';

	const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:'));
</script>

{#if href}
	<a
		{href}
		target={isExternal ? '_blank' : '_self'}
		rel={isExternal ? 'noopener noreferrer' : undefined}
		class={className}
	>
		<slot />
	</a>
{:else if className}
	<div class={className}>
		<slot />
	</div>
{:else}
	<slot />
{/if}
