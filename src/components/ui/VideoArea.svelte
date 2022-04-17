<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmLeft, ArrowSmRight } from '@steeze-ui/heroicons';
	import YouTube from 'svelte-youtube';
	export let links;
	let currentVideoIndex = 0;
	let player;
	$: console.log(player);
	const onReady = (event) => {
		console.log(event.target);
		if (event != null) {
			event.detail.target.playVideo();
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

	<YouTube
		bind:player
		on:end={() => currentVideoIndex++}
		on:ready={onReady}
		videoId={links[currentVideoIndex]}
		id={1}
		class={''}
		options={{}}
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
