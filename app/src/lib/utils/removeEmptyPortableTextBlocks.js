// functions.js (or in your component script)
export default function removeEmptyPortableTextBlocks(blocks) {
	return blocks.filter((block) => {
		// Only keep non-text blocks (images, custom blocks, etc.)
		if (block._type !== 'block') return true;

		// Keep blocks with children that include at least one non-whitespace span
		if (Array.isArray(block.children)) {
			return block.children.some(
				(child) => typeof child.text === 'string' && child.text.trim().length > 1
			);
		}

		return false;
	});
}
