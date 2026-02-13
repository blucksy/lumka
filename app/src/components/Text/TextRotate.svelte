<script>
	import removeEmptyPortableTextBlocks from '$lib/utils/removeEmptyPortableTextBlocks';

	export let item;

	// Precompute a random rotation for each character, once
	function getRandomRotations(text) {
		return [...text].map((c) => ({
			char: c,
			rotation: c === ' ' ? 0 : Math.random() * 10 - 5 // -5 to 5 deg
		}));
	}

	let spans = [];

	// Split text into words and precompute rotations per character

	if (typeof item === 'string') {
		spans = [
			{
				marks: [],
				words: item.split(' ').map((word) => ({
					chars: getRandomRotations(word)
				}))
			}
		];
	} else {
		item = removeEmptyPortableTextBlocks(item);
		spans = item[0].children.map((child) => ({
			marks: child.marks,
			words: child.text.split(' ').map((word) => ({
				chars: getRandomRotations(word)
			}))
		}));
	}

	const space = ' ';

	console.log(spans);
</script>

{#each spans as span}
	{#each span.words as word, wi}
		{#if word.chars.length > 0}
			<span class="inline-flex">
				{#each word.chars as { char, rotation }}
					<span
						class="transition-transform group-hover:rotate-(--rotation) {span.marks &&
						span.marks.includes('em')
							? 'italic'
							: ''}"
						style="--rotation: {rotation}deg;"
					>
						{char}
					</span>
				{/each}
			</span>
		{/if}

		{wi < span.words.length - 10 ? space : ''}
	{/each}
{/each}
