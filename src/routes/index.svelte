<script lang="ts">
	import SearchInput from "../components/ui/SearchInput.svelte";
	import { token } from "../stores/stores";
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import {clickOutside} from '../helpers/clickOutside';
	type AutocompleteResult = {
		community_icon: string,
		display_name: string,
	}

	const redirectUrl = 'http://localhost:3000/oauth';
	const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=Bt0zJiirFQI3lGtqPM-W5A&response_type=code&state=2&redirect_uri=${redirectUrl}&duration=permanent&scope=read`;
	let t;
	let currentSearchTerm;
	let autocomplete: AutocompleteResult[];
	let subList: AutocompleteResult[] = []

	onMount(() => {
		token.subscribe(token => {
			t = token;
		})
	});

	const handleClickOutside = () => {
		autocomplete = []
	}

	const addSubToList = (result) => {
		subList = [...subList, result]
	}
	let padding = '52';
	const handleRemovePadding = () => {
		padding = "2";
	}

</script>

<div>
	{#if t == null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{:else}
		<div class="flex space-x-4">
			<div class="flex space-x-4">
				<SearchInput
						bind:inputValue={currentSearchTerm}
						bind:autocompleteResults={autocomplete}
				/>

					<button
						disabled={subList.length === 0}
						class={`rounded ${subList.length === 0 ? 'bg-gray-200' : 'bg-amber-300'} hover:shadow-lg p-2`}
					>
						Generate
					</button>

			</div>
			<div class="flex space-x-4">
				{#each subList as sub}
					<div
							transition:fade="{{duration: 50 }}"
							class="h-12 border bg-green-200 rounded p-2"
					>
						<p>{sub.display_name}</p>
					</div>
				{/each}
			</div>
		</div>

		{#if autocomplete != null && autocomplete.length > 0}
			<div
				class="space-y-2 w-1/5 mt-4 border border-purple-500"
				use:clickOutside on:click_outside={handleClickOutside}
			>
				{#each autocomplete as result}
					<div
						on:click={() => addSubToList(result)}
						class="p-2 border border-blue-300 rounded w-full hover:shadow-lg hover:bg-blue-300 cursor-pointer"
					>
						<p>{result.display_name}</p>
					</div>
				{/each}
			</div>

		{/if}
	{/if}
</div>