<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { setToken } from '../stores/setToken';
	import { goto } from '$app/navigation';
	import { fetchToken } from '../helpers/authenticationHandlers';

	onMount(async () => {
		let code = $page.url.searchParams.get('code');
		if (code != null) {
			const response = await fetchToken({ code });
			await goto(`/`, { replaceState: true });
		}
	});
</script>
