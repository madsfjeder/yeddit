<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmLeft, ArrowSmRight } from '@steeze-ui/heroicons';
	import YouTubeCustom from './YouTubeCustom.svelte';
	import type { VideoLink } from '../../helpers/generateVideoList';
	export let links: VideoLink[];
	let currentVideoIndex = 0;
	$: currentVideo = links[currentVideoIndex];
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
	<div class="flex-col space-y-3">
		<h1 class="font-bold">
			{currentVideo.title}
		</h1>
		<div class="flex justify-between">
			<p>
				Posted by {currentVideo.author}
			</p>
			<a
				class="text-blue-500 underline"
				href={'https://www.reddit.com' + currentVideo.permalink}
			>
				Original post
			</a>
		</div>

		<YouTubeCustom
			bind:player
			on:end={() => currentVideoIndex++}
			on:ready={onReady}
			videoId={currentVideo.id}
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
	</div>

	<button
		class="ml-4 h-14"
		on:click={() => {
			currentVideoIndex++;
		}}
	>
		<Icon src={ArrowSmRight} class="color-blue-700" />
	</button>
</div>
