<script>
	export let src;
</script>

<div class="grayscale w-full overflow-hidden opacity-95">
	<div class=" halftone w-full">
		<img class="w-full h-auto object-cover" src={src + '?auto=format&w=300'} />
		<div class="halftone-ink"></div>
	</div>
</div>

<style>
	.halftone {
		--halftone-size: 4px;
		--halftone-bleed: 0.4;
		--halftone-dot-size: calc(var(--halftone-size) * var(--halftone-bleed));
		--halftone-color-dot-size: var(--halftone-dot-size);
		position: relative;
		filter: brightness(calc(0.5 + var(--halftone-bleed) * 0.3 - 0.02))
			blur(calc(var(--halftone-size) * 0.1)) contrast(1000) blur(0.6px);
		overflow: hidden;
	}

	.halftone img {
		display: block;
		filter: brightness(0.9);
	}

	.halftone-ink {
		mix-blend-mode: screen;
	}

	.halftone-ink::after {
		transform: rotate(calc(-21deg)) translateX(calc(var(--halftone-size) * 0.58));
		background-image: radial-gradient(var(--halftone-color-dot-size) at 75% 25%, #f0f, #f6f, #fff),
			radial-gradient(var(--halftone-color-dot-size) at 25% 75%, #f0f, #f6f, #fff),
			radial-gradient(var(--halftone-color-dot-size) at 75% 75%, #0ff, #6ff, #fff),
			radial-gradient(var(--halftone-color-dot-size) at 25% 25%, #0ff, #6ff, #fff);
		transition: transform 100ms;
	}

	.halftone-ink::before {
		transform: rotate(30deg);
		background-image: radial-gradient(var(--halftone-color-dot-size) at 25% 25%, #ff0, #ff6, #fff),
			radial-gradient(var(--halftone-color-dot-size) at 75% 75%, #ff0, #ff6, #fff);
	}

	.halftone-ink::before,
	.halftone-ink::after {
		content: '';
		position: absolute;
		inset: -30%;
		background-size: var(--halftone-size) var(--halftone-size);
		background-blend-mode: multiply;
		mix-blend-mode: multiply;
	}
</style>
