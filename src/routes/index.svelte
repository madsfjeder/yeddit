<script lang="ts">
	import SearchInput from "../components/ui/SearchInput.svelte";
	import { token } from "../stores/stores";
	import { onMount } from "svelte";
	type AutocompleteResult = {
		community_icon: string,
		display_name: string,
	}

	const redirectUrl = 'http://localhost:3000/oauth';
	const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=Bt0zJiirFQI3lGtqPM-W5A&response_type=code&state=2&redirect_uri=${redirectUrl}&duration=permanent&scope=read`;
	let t;
	let currentSearchTerm;
	let autocomplete: AutocompleteResult[];
	onMount(() => {
		token.subscribe(token => {
			t = token;
		})
	});

</script>

<div class="p-52">
	{#if t == null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{:else}
		<SearchInput
			bind:inputValue={currentSearchTerm}
			bind:autocompleteResults={autocomplete}
		/>
		{#if autocomplete != null && autocomplete.length > 0}
			{#each autocomplete as result}
				<p>{result.display_name}</p>
			{/each}
		{/if}
	{/if}
</div>