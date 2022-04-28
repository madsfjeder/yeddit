<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { setToken } from '../stores/setToken';
	import { goto } from '$app/navigation';
	type AuthResponse = {
		access_token: string;
		refresh_token: string;
		expires_in: number;
	};

	onMount(async () => {
		let code = $page.url.searchParams.get('code');
		const username = 'Bt0zJiirFQI3lGtqPM-W5A';
		const password = '';
		if (code != null) {
			const res = await fetch(
				'https://www.reddit.com/api/v1/access_token',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization:
							'Basic ' + btoa(username + ':' + password)
					},
					body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/oauth`
				}
			);
			const j: AuthResponse = await res.json();
			setToken(j.access_token);
			localStorage.setItem('token', j.access_token);
			await goto(`/`, { replaceState: true });
		}
	});
</script>
