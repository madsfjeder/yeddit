import type { SubList } from '../types/types';
import { getToken } from './authenticationHandlers';

export type VideoLink = {
	id: string | null;
	thumbnail: string;
	title: string;
	subreddit: string;
	permalink: string;
	author: string;
};

export const generateVideoList = async (subList: SubList) => {
	const fetchToken = await getToken();
	if (fetchToken == null) {
		throw new Error('Attempting to fetch but no valid token');
	}
	let filteredLinks: VideoLink[] = [];
	for await (const sub of subList) {
		try {
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
			console.log(result);
			const filteredResult = result.data.children.map((res: any) => {
				if (res?.data?.media?.type === 'youtube.com') {
					let content: VideoLink;
					const s = res?.data?.media_embed?.content;
					if (s != null) {
						const id = s.match(
							/src="https:\/\/www\.youtube\.com\/embed\/([\w]*)/
						);
						content = {
							id: id[1] ?? null,
							thumbnail: res.data?.thumbnail,
							title: res.data?.title,
							subreddit: res.data?.subreddit,
							permalink: res.data?.permalink,
							author: res.data?.author
						};
					}

					return content;
				}
			});
			filteredLinks = [...filteredLinks, ...filteredResult];
		} catch (error) {
			console.log(error);
		}
	}
	return filteredLinks.filter((link) => link != null);
};
