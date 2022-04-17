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
		// CLEAN
		const filteredResult = result.data.children.map((res) => {
			if (res.data.media.type === 'youtube.com') {
				const s = res.data.media_embed.content;
				const url = s
					.match(/(https:\/\/www\.youtube\.com.*)/)[0]
					.split('"');
				const videoId = url[0].match(/(?<=embed\/)(.*?)(?=\?)/);
				return videoId[0];
			}
		});
		return filteredResult;
	}
};
