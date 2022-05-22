<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	export let subName: string;
	export let thumbnailUrl: string;
	export let index: number;
	export let title: string;
	export let firstInList: boolean = false;
	export let playClicked: (i: number) => void;
	import { Play } from '@steeze-ui/heroicons';
</script>

<div
	on:click={() => playClicked(index)}
	class="m-2 flex w-[220px] cursor-pointer flex-col items-center justify-center space-y-1 rounded-md bg-gray-50 p-4 shadow-lg"
>
	<p class="text-sm font-bold">{subName}</p>
	<p class="text-center text-sm">{title}</p>
	<div class="relative flex w-full justify-center align-middle">
		<img
			class="background-image `${firstInList
				? 'rounded-md blur-[2px] backdrop-filter'
				: ''}`"
			width="178"
			height="136"
			src={thumbnailUrl}
		/>
		<div
			class="absolute flex h-full w-full flex-col items-center justify-center text-gray-50 bg-blend-overlay"
		>
			<p>Next up</p>
			<Icon class="h-1/3 w-1/3" src={Play} />
		</div>
	</div>
</div>
