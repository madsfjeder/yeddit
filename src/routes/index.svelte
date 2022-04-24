<script lang="ts">
	import SearchInput from '../components/ui/SearchInput.svelte';
	import VideoArea from '../components/ui/VideoArea.svelte';
	import { token } from '../stores/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { clickOutside } from '../helpers/clickOutside';
	import type { AutocompleteResult, SubList } from '../types/types';
	import { generateVideoList } from '../helpers/generateVideoList';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash } from '@steeze-ui/heroicons';
	const redirectUrl = 'http://localhost:3000/oauth';
	const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=Bt0zJiirFQI3lGtqPM-W5A&response_type=code&state=2&redirect_uri=${redirectUrl}&duration=permanent&scope=read`;
	let t;
	let currentSearchTerm;
	let autocomplete: AutocompleteResult[];
	let subList: AutocompleteResult[] = [];

	onMount(() => {
		token.subscribe((token) => {
			t = token;
		});
	});

	const handleClickOutside = () => {
		autocomplete = [];
	};

	const addSubToList = (result) => {
		subList = [...subList, result];
	};
	let links = [];
	const handleGenerateList = async () => {
		links = await generateVideoList(subList);
	};

	const handleRemoveSub = (inputSub: SubList[number]) => {
		subList = subList.filter(
			(sub) => sub.display_name !== inputSub.display_name
		);
	};
</script>

<div class="max-h-full">
	{#if t == null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{:else}
		<div class="flex w-full max-h-full">
			<div class="flex flex-col w-2/5">
				<div class="flex flex-row align-middle space-x-4 h-12">
					<SearchInput
						bind:inputValue={currentSearchTerm}
						bind:autocompleteResults={autocomplete}
					/>

					<button
						on:click={handleGenerateList}
						class={`rounded ${
							subList.length === 0
								? 'bg-gray-200'
								: 'bg-amber-300'
						} hover:shadow-lg p-2`}
					>
						Generate
					</button>
				</div>
				{#if autocomplete != null && autocomplete.length > 0}
					<div
						class="mt-4 space-y-2 w-3/6"
						use:clickOutside
						on:click_outside={handleClickOutside}
					>
						{#each autocomplete as result}
							<div
								on:click={() => addSubToList(result)}
								class="p-2 border border-blue-200 rounded w-full hover:shadow-lg hover:bg-blue-300 cursor-pointer"
							>
								<p>{result.display_name}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex w-3/5 max-h-full h-full max-w-3/5 flex-wrap">
				{#each subList as sub}
					<div
						transition:fade={{ duration: 50 }}
						class="h-12 mx-2 rounded p-3 border border-blue-200 flex align-middle space-x-1"
					>
						<p
							class="m-0 leading-tight text-md align-middle text-center"
						>
							{sub.display_name}
						</p>
						<div
							class="w-8 cursor-pointer"
							on:click={() => handleRemoveSub(sub)}
						>
							<Icon src={Trash} class="fill-red-200" />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if links.length > 0}
		<VideoArea {links} />
	{/if}
</div>
