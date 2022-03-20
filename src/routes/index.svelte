<script lang="ts">
	import SearchInput from "../components/ui/SearchInput.svelte";
	import {token} from "../stores/stores";

	let t;
	token.subscribe(token => {
		t = token;
	})
</script>

<div class="p-52">
	<SearchInput/>
	<p>{t ?? ""}</p>
</div>