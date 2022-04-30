<script lang="ts">
	import { onMount } from 'svelte';
	import { token } from '../../stores/stores';
	import type { Sub } from '../../types/types';
	export let inputValue = undefined;
	export let autocompleteResults: Sub[] = [];
	let t;
	onMount(() => {
		const token = localStorage.getItem('token');
		if (token != null) {
			t = token;
		} else {
		}
	});
	const handleChange = async () => {
		const res = await fetch(
			`https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=${inputValue}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'bearer ' + t
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
				display_name: e.data.display_name
			};
		});
		autocompleteResults = results;
	};
</script>

<input
	bind:value={inputValue}
	on:input={handleChange}
	class="w-full border border-gray-200 p-1"
	placeholder="Search"
	type="text"
/>
