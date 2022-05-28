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
	class={`flex cursor-pointer space-x-2 rounded-md p-2`}
>
	<div class="relative flex w-1/4">
		<img
			class="background-image w-full bg-cover `${firstInList || playing
				? 'rounded-md blur-[2px] brightness-50 backdrop-filter'
				: ''}`"
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
	<div class="w-2/3">
		<p class="text-[0.9vw] font-bold">{subName}</p>
		<p class="text-[0.9vw]">{title}</p>
	</div>
</div>
