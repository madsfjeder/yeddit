<script lang="ts">
	import SearchInput from '../components/ui/SearchInput.svelte';
	import VideoArea from '../components/ui/VideoArea.svelte';
	import { onMount } from 'svelte';
	import { clickOutside } from '../helpers/clickOutside';
	import type { Sub, SubList } from '../types/types';
	import { generateVideoList } from '../helpers/generateVideoList';
	import InputSub from '../components/ui/InputSub.svelte';
	import LoadingSpinner from '../components/ui/LoadingSpinner.svelte';
	import { getToken } from '../helpers/authenticationHandlers';
	import AutoCompleteResults from '../components/ui/AutoCompleteResults.svelte';

	const redirectUrl = 'http://localhost:3000/oauth';
	const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=Bt0zJiirFQI3lGtqPM-W5A&response_type=code&state=2&redirect_uri=${redirectUrl}&duration=permanent&scope=read`;
	let token = undefined;
	let currentSearchTerm;
	let autocomplete: Sub[];
	let subList: Sub[] = [];
	let inputFocus = false;
	let keyboardNavigation = false;

	onMount(async () => {
		token = await getToken();
	});

	const handleClickOutside = () => {
		autocomplete = [];
	};

	const addSubToList = (result: SubList[number]) => {
		const resultIndex = subList.findIndex(
			(sub) => sub.display_name === result.display_name
		);
		if (subList[resultIndex] != null) {
			subList[resultIndex].animate = true;
			subList = [...subList];
		} else {
			subList = [...subList, { ...result, animate: false }];
			currentSearchTerm = '';
			autocomplete = [];
			inputFocus = true;
			keyboardNavigation = false;
		}
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

	const navigateList = (direction: 'up' | 'down') => {
		let idx = autocomplete.findIndex((e) => {
			return e.focused === true;
		});
		if (idx === -1) {
			idx = 0;
		}
		if (direction === 'up' && idx === 0) {
			autocomplete[idx].focused = false;
			inputFocus = true;
			keyboardNavigation = false;
			autocomplete = [...autocomplete];
		} else if (
			direction === 'up' &&
			idx - 1 >= 0 &&
			autocomplete[idx - 1] != null
		) {
			autocomplete[idx].focused = false;
			autocomplete[idx - 1].focused = true;
			autocomplete = [...autocomplete];
		} else if (
			direction === 'down' &&
			idx + 1 < autocomplete.length &&
			autocomplete[idx + 1] != null
		) {
			autocomplete[idx].focused = false;
			autocomplete[idx + 1].focused = true;
			autocomplete = [...autocomplete];
		}
	};
</script>

<div class="max-h-full">
	{#if token === undefined}
		<LoadingSpinner />
	{/if}
	{#if token === null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{/if}
	{#if token != null}
		<div class="flex max-h-full w-full">
			<div class="flex w-2/5 flex-col">
				<div class="flex h-12 flex-row space-x-4 align-middle">
					<SearchInput
						bind:inputValue={currentSearchTerm}
						bind:autocompleteResults={autocomplete}
						bind:inputFocus
						bind:keyboardNavigation
					/>
					<button
						on:click={handleGenerateList}
						class={`rounded ${
							subList.length === 0
								? 'bg-gray-200'
								: 'bg-amber-300'
						} p-2 hover:shadow-lg`}
					>
						Generate
					</button>
				</div>
				{#if autocomplete != null && autocomplete.length > 0}
					<div
						class="z-50 mt-4 w-3/6 space-y-2"
						use:clickOutside
						on:click_outside={handleClickOutside}
					>
						{#each autocomplete as result}
							<AutoCompleteResults
								{addSubToList}
								{result}
								{navigateList}
							/>
						{/each}
					</div>
				{/if}
			</div>
			<div class="h-ful flex w-3/5 flex-wrap">
				{#each subList as sub}
					<InputSub {sub} {handleRemoveSub} />
				{/each}
			</div>
		</div>
	{/if}
	{#if links.length > 0}
		<VideoArea videoLinkProps={links} />
	{/if}
</div>
