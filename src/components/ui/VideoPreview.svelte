<script>
	export let subName;
	export let thumbnailUrl;
	export let index;
	export let title;
	export let playClicked;
</script>

<div
	on:click={() => playClicked(index)}
	class="m-2 flex w-[220px] cursor-pointer flex-col items-center justify-center space-y-1 rounded-md bg-gray-50 p-4 shadow-lg"
>
	<p class="text-sm font-bold">{subName}</p>
	<p class="text-center text-sm">{title}</p>
	<div class="flex w-full justify-center ">
		<img width="178" height="136" src={thumbnailUrl} />
	</div>
</div>
