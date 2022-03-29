<script lang="ts">
	import {onMount} from "svelte";
	import {token} from "../../stores/stores";
	type AutocompleteResult = {
		community_icon: string,
		display_name: string,
	}

	export let inputValue = undefined;
	export let autocompleteResults: AutocompleteResult[] = [];
	let t;
	onMount(() => {
		token.subscribe(token => {
			t = token;
		})
	});
	const handleChange = async() => {
		console.log(inputValue)
		const res = await fetch(`https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=${inputValue}`,
			{
				method:'GET',
				headers: {
					'Content-Type':'application/x-www-form-urlencoded',
					'Authorization': 'bearer ' + t
				}
			}
		)
		const parsed = await res.json()
		const filtered = parsed.data.children.filter((e) => {
			return e.data?.display_name && e.data.display_name.length > 0;
		});
		const results = filtered.map((e) => {
			return {
				community_icon: e.data.community_icon,
				display_name: e.data.display_name
			};
		});
		autocompleteResults = results
	}
</script>

<div>
	<input
		bind:value={inputValue}
		on:input={handleChange}
		class="border border-gray-200 w-full p-1"
		placeholder="Search"
		type="text"
	>
</div>