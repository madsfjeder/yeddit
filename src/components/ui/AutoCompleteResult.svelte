<script>
	export let result;
	export let addSubToList;
	export let btn;
	export let navigateList;

	$: if (result.focused) {
		btn.focus();
	}
	const handleKeyPress = (e) => {
		if (e.code === 'ArrowDown') {
			navigateList('down');
		}
		if (e.code === 'ArrowUp') {
			navigateList('up');
		}
	};
</script>

<button
	bind:this={btn}
	on:click={() => addSubToList(result)}
	on:keydown={handleKeyPress}
	class="w-full cursor-pointer rounded border border-blue-200 bg-white p-2 hover:bg-blue-300 hover:shadow-lg focus:bg-blue-500 focus:text-white"
>
	{result.display_name}
</button>
