<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash } from '@steeze-ui/heroicons';
	import type { Sub } from '../../types/types';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let handleRemoveSub;
	export let sub: Sub;

	const scale = spring(1);
	$: if (sub != null && sub.animate) {
		scale.set(1.3);
		setTimeout(() => {
			scale.set(1);
		}, 50);
		sub.animate = false;
	}

	onMount(() => {
		scale.set(1.3);
		setTimeout(() => {
			scale.set(0.8);
		}, 50);
		setTimeout(() => {
			scale.set(1);
		}, 125);
	});
</script>

<div
	style={`transform: scale(${$scale})`}
	out:fade={{ duration: 75 }}
	class={`mx-2 flex h-12 space-x-1 rounded border border-blue-200 p-3 align-middle`}
>
	<p class="text-md m-0 text-center align-middle leading-tight">
		{sub.display_name}
	</p>
	<div class="w-8 cursor-pointer" on:click={() => handleRemoveSub(sub)}>
		<Icon src={Trash} class="fill-red-200" />
	</div>
</div>
