import type { SubList } from '../types/types';
import { token } from '../stores/stores';

export const generateVideoList = async (subList: SubList) => {
	let fetchToken;
	token.subscribe((token) => {
		fetchToken = token;
	});
	for await (const sub of subList) {
		const res = await fetch(
			`https://oauth.reddit.com/r/${sub.display_name}/hot?limit=10.json`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'bearer ' + fetchToken
				}
			}
		);
		const result = await res.json();
		const filteredResult = result.data.children.map((res) => {
			if (res.data.media.type === 'youtube.com') {
				const s = res.data.media_embed.content;
				const id = s.match(
					/src="https:\/\/www\.youtube\.com\/embed\/([\w]*)/
				);
				return id[1] ?? null;
			}
		});
		return filteredResult;
	}
};
