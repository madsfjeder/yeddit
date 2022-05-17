<script lang="ts">
	import { onMount } from 'svelte';
	import type { Sub } from '../../types/types';
	export let inputValue = undefined;
	export let autocompleteResults: Sub[] = [];
	let token;
	export let keyboardNavigation = false;
	export let inputFocus = false;
	export let inputInstance;

	onMount(() => {
		token = localStorage.getItem('token');
	});

	$: if (inputFocus) {
		if (inputInstance != null) {
			inputInstance.focus();
			inputFocus = false;
		}
	}

	const handleChange = async () => {
		const res = await fetch(
			`https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=${inputValue}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'bearer ' + token
				}
			}
		);
		const parsed = await res.json();
		const filtered = parsed.data.children.filter((e) => {
			return e.data?.display_name && e.data.display_name.length > 0;
		});
		const results = filtered.map((e) => {
			return {
				community_icon: e.data.community_icon,
				display_name: e.data.display_name,
				focused: false
			};
		});
		autocompleteResults = results;
	};

	const handleKeydown = (e) => {
		if (e.code === 'ArrowDown' && keyboardNavigation === false) {
			autocompleteResults[0].focused = true;
			autocompleteResults = [...autocompleteResults];
			keyboardNavigation = true;
		}
	};
</script>

<input
	bind:value={inputValue}
	bind:this={inputInstance}
	on:input={handleChange}
	on:keydown={handleKeydown}
	class="w-full border border-gray-200 p-1"
	placeholder="Search"
	type="text"
/>
