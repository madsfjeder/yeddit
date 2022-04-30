<script>
	export let duration;
	export let subName;
	export let thumbnailUrl;
	export let index;
	export let title;
	export let playClicked;
</script>

<div
	on:click={() => playClicked(index)}
	class="m-2 flex w-4/5 cursor-pointer flex-col justify-center space-y-1 rounded-md p-4 shadow-lg"
>
	<p class="text-sm font-bold">{subName}</p>
	<p class="text-sm">{title}</p>
	<div class="flex w-full ">
		<img width="168" height="126" src={thumbnailUrl} />
	</div>
</div>
