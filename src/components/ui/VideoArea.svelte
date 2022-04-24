<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmLeft, ArrowSmRight } from '@steeze-ui/heroicons';
	import YouTubeCustom from './YouTubeCustom.svelte';
	export let links;
	let currentVideoIndex = 0;
	let player;
	const onReady = (event) => {
		if (event != null && player != null) {
			player.playVideo();
		}
	};
</script>

<div class="mt-10 flex h-[26rem] w-full flex-row justify-center align-middle">
	<button
		class="mr-4 h-14"
		on:click={() => {
			currentVideoIndex--;
		}}
	>
		<Icon src={ArrowSmLeft} class="fill-blue-700" />
	</button>

	<YouTubeCustom
		bind:player
		on:end={() => currentVideoIndex++}
		on:ready={onReady}
		videoId={links[currentVideoIndex]}
		id={1}
		class={''}
		options={{
			height: '390',
			width: '640',
			playerVars: {
				autoplay: 1
			}
		}}
	/>

	<button
		class="ml-4 h-14"
		on:click={() => {
			currentVideoIndex++;
		}}
	>
		<Icon src={ArrowSmRight} class="color-blue-700" />
	</button>
</div>
