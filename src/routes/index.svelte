<script lang="ts">
	import SearchInput from "../components/ui/SearchInput.svelte";
	import VideoArea from "../components/ui/VideoArea.svelte";
	import { token } from "../stores/stores";
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import {clickOutside} from '../helpers/clickOutside';
	import type { AutocompleteResult } from "../types/types";
	import {generateVideoList} from "../helpers/generateVideoList";
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
	let links = []
	const handleGenerateList = async() => {
		links = await generateVideoList(subList)
	}


</script>

<div class="max-h-full">
	{#if t == null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{:else}
		<div class="flex w-full max-h-full">
			<div class="flex flex-col w-2/5 ">
				<div class="flex flex-row space-x-4 h-14">
					<SearchInput
							bind:inputValue={currentSearchTerm}
							bind:autocompleteResults={autocomplete}
					/>

					<button
							on:click={handleGenerateList}
							class={`rounded ${subList.length === 0 ? 'bg-gray-200' : 'bg-amber-300'} hover:shadow-lg p-2`}
					>
						Generate
					</button>
				</div>
				{#if autocomplete != null && autocomplete.length > 0}
					<div
							class="space-y-2 w-3/5 border border-purple-500"
							use:clickOutside
							on:click_outside={handleClickOutside}
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
			</div>
			<div class="p-4 flex w-3/5 border border-blue-500 max-h-full h-full max-w-3/5 flex-wrap">
				{#each subList as sub}
					<div
							transition:fade="{{duration: 50 }}"
							class="h-12 m-2 border bg-green-200 rounded p-2"
					>
						<p>{sub.display_name}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if links.length > 0}
		<iframe src={links[0]} frameborder="0" allow='autoplay'></iframe>
	{/if}
</div>