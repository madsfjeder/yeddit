<script lang="ts">
	import SearchInput from "../components/ui/SearchInput.svelte";
	import {token} from "../stores/stores";
	const redirectUrl = 'http://localhost:3000/oauth';
	const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=Bt0zJiirFQI3lGtqPM-W5A&response_type=code&state=2&redirect_uri=${redirectUrl}&duration=permanent&scope=read`;
	let t;
	token.subscribe(token => {
		t = token;
	})
</script>

<div class="p-52">
	{#if t == null}
		<div>
			<a href={authUrl}>Auth here!</a>
		</div>
	{:else}
		<SearchInput/>
		<p>{t ?? ""}</p>
	{/if}
</div>