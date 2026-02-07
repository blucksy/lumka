<script>
	import '@mux/mux-player';
	export let video;
	export let className;
	console.log(video.asset.playbackId);
</script>

<div class="bg-green-300 col-start-2 aspect-h-5 aspect-w-3 col-span-10 z-20 my-auto mx-auto w-full">
	<div class=" h-full flex relative bg-green-300 w-full">
		<mux-player
			class={className}
			playback-id={video.asset.playbackId}
			muted
			playsinline
			autoplay
			loop
		/>
	</div>
</div>
