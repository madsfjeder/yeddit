<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmLeft, ArrowSmRight } from '@steeze-ui/heroicons';
	import YouTubeCustom from './YouTubeCustom.svelte';
	import type { VideoLink } from '../../helpers/generateVideoList';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import VideoPreview from './VideoPreview.svelte';
	import Toggle from './Toggle.svelte';
	import shuffle from 'lodash.shuffle';

	export let videoLinkProps: VideoLink[];
	$: unshuffledList = [...videoLinkProps];
	$: links = [...videoLinkProps];

	let shuffleToggled = false;
	let currentVideoIndex = 0;
	$: currentVideo = videoLinkProps[currentVideoIndex];

	$: if (shuffleToggled) {
		links = shuffle(videoLinkProps);
	} else {
		links = unshuffledList;
	}

	let player;
	const onReady = (event) => {
		/*if (event != null && player != null) {
			player.playVideo();
		}*/
	};
</script>

<div class="mt-10 flex h-[26rem] w-full flex-row justify-between">
	<div class="flex flex-row align-middle">
		<div class="flex-col space-y-3">
			<div class="flex flex-row justify-between">
				<button
					class="mr-4 h-14"
					on:click={() => {
						currentVideoIndex--;
					}}
				>
					<Icon src={ArrowSmLeft} class="fill-blue-700" />
				</button>
				<div class="flex-grow">
					<h1 class="font-bold">
						{currentVideo.title}
					</h1>
					<div class="flex justify-between">
						<p>
							Posted by {currentVideo.author}
						</p>
						<a
							class="text-blue-500 underline"
							href={'https://www.reddit.com' +
								currentVideo.permalink}
						>
							Original post
						</a>
					</div>
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

			<YouTubeCustom
				bind:player
				on:end={() => currentVideoIndex++}
				on:ready={onReady}
				videoId={currentVideo.id}
				id={1}
				class={''}
				options={{
					height: '390',
					width: '780',
					playerVars: {
						autoplay: 0
					}
				}}
			/>
		</div>
	</div>
	<div class="flex h-[36rem] w-1/4 flex-col items-end">
		<div class="m-3 mr-5 flex space-x-2 align-middle">
			<h3 class="text-sm font-light text-gray-600">Shuffle</h3>
			<Toggle bind:toggled={shuffleToggled} />
		</div>

		<div class="flex flex-col items-end overflow-y-scroll">
			{#each links as video, index (video)}
				<div animate:flip={{ duration: 500, easing: quintOut }}>
					<VideoPreview
						subName={video.subreddit}
						{index}
						playClicked={(index) => {
							currentVideoIndex = index;
						}}
						title={video.title}
						thumbnailUrl={video.thumbnail}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
