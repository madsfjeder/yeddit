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

	const setLinkList = (newList: VideoLink[]) => {
		links = newList;
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
	<VideoList {links} bind:shuffleToggled {currentVideoIndex} {setLinkList} />
</div>
