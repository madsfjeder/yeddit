<script lang="ts">
	import Toggle from './Toggle.svelte';
	import VideoPreview from './VideoPreview.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import type { VideoLink } from '../../helpers/generateVideoList';

	export let links: VideoLink[];
	export let currentVideoIndex: number;
	export let shuffleToggled: boolean;
	export let autoplay: boolean;
	export let setLinkList: (linkList: VideoLink[]) => void;

	let hovering = false;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newTracklist = [...links];

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		links = [...newTracklist];
		setLinkList(newTracklist);
		hovering = null;
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

<div class="flex h-[36rem] w-1/4 flex-col items-end">
	<div class="m-3 mr-5 flex space-x-2 align-middle">
		<h3 class="text-sm font-light text-gray-600">Autoplay</h3>
		<Toggle bind:toggled={autoplay} />
		<h3 class="text-sm font-light text-gray-600">Shuffle</h3>
		<Toggle bind:toggled={shuffleToggled} />
	</div>

	<div class="flex flex-col items-end overflow-y-scroll">
		{#each links as video, index (video.title)}
			<div
				animate:flip={{ duration: 150, easing: quintOut }}
				draggable={true}
				on:dragstart={(event) => dragstart(event, index)}
				on:drop|preventDefault={(event) => drop(event, index)}
				ondragover="return false"
				on:dragenter={() => (hovering = index)}
				class={`${
					hovering === index ? 'bg-blue-500' : null
				} rounded-md`}
			>
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
