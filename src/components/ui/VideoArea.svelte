<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowSmLeft, ArrowSmRight } from '@steeze-ui/heroicons';
	import YouTubeCustom from './YouTubeCustom.svelte';
	import type { VideoLink } from '../../helpers/generateVideoList';
	import shuffle from 'lodash.shuffle';
	import VideoList from './VideoList.svelte';

	export let videoLinkProps: VideoLink[];
	$: unshuffledList = [...videoLinkProps];
	$: links = [...videoLinkProps];

	let shuffleToggled = false;
	let autoplay = false;
	let currentVideoIndex = 0;
	$: currentVideo = links[currentVideoIndex];
	$: if (shuffleToggled) {
		links = shuffle(videoLinkProps);
		currentVideoIndex = 0;
	} else {
		currentVideoIndex = 0;
		links = unshuffledList;
	}

	let player;
	const onReady = (event) => {
		if (event != null && player != null && autoplay) {
			player.playVideo();
		}
	};

	const setLinkList = (newList: VideoLink[]) => {
		links = newList;
	};
</script>

<div class="mt-10 flex h-full w-full flex-row justify-between">
	<div class="flex w-2/3 flex-row align-middle">
		<div class="mr-10 w-full flex-col space-y-3">
			<div class="flex w-full flex-row justify-between">
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
				class={'h-[calc(100vh-222px)]'}
				options={{
					height: '100%',
					width: '100%',
					playerVars: {
						autoplay: autoplay ? 1 : 0
					}
				}}
			/>
		</div>
	</div>
	<VideoList
		{links}
		bind:shuffleToggled
		bind:currentVideoIndex
		bind:autoplay
		{setLinkList}
	/>
</div>
