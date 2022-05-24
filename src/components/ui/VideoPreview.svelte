<script lang="ts">
	import { faPlay } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import debounce from 'lodash.debounce';
	export let subName: string;
	export let thumbnailUrl: string;
	export let index: number;
	export let title: string;
	export let firstInList: boolean = false;
	export let playing: boolean = false;
	export let playClicked: (i: number) => void;
	let element;
	const debouncedScrollIntoView = debounce(() => {
		element.scrollIntoView({
			inline: 'start',
			block: 'start',
			behavior: 'smooth'
		});
	}, 300);
	$: if (firstInList && element != null) {
		debouncedScrollIntoView();
	}
</script>

<div
	bind:this={element}
	on:click={() => playClicked(index)}
	class={`m-2 flex w-[220px] cursor-pointer flex-col items-center justify-center space-y-1 rounded-md bg-gray-50 p-4 shadow-lg`}
>
	<p class="text-sm font-bold">{subName}</p>
	<p class="text-center text-sm">{title}</p>
	<div class="relative flex w-full justify-center align-middle">
		<img
			class="background-image `${firstInList || playing
				? 'rounded-md blur-[2px] brightness-50 backdrop-filter'
				: ''}`"
			width="178"
			height="136"
			src={thumbnailUrl}
		/>
		{#if firstInList}
			<div
				class="absolute flex h-full w-full flex-col items-center justify-center space-y-2 font-medium text-gray-50 "
			>
				<p>Next up</p>
				<Fa class="h-1/3 w-1/3" icon={faPlay} />
			</div>
		{:else if playing}
			<div
				class="font-medium absolute flex h-full w-full flex-col items-center justify-center space-y-2 text-gray-50 "
			>
				<p>Playing</p>
			</div>
		{/if}
	</div>
</div>
