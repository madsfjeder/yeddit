import { setToken } from '../stores/setToken';
import { env } from '$env/dynamic/private';
import moment from 'moment';

export type AuthResponse = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
};

const username = env.REDDIT_USERNAME;
const password = env.REDDIT_PASSWORD;
const redirectUri = env.REDIRECT_URI;

export const getToken = async () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	const expiryDate = moment(localStorage.getItem('tokenExpirationTime'));
	const now = moment();
	if (now.isAfter(expiryDate) && refreshToken != null) {
		await refetchToken();
		await getToken();
	}
	if (token != null) {
		return token;
	} else {
		return null;
	}
};

export const fetchToken = async ({ code }: { code: string }) => {
	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(username + ':' + password)
		},
		body: `grant_type=authorization_code&code=${code}&duration=permanent&redirect_uri=${redirectUri}`
	});
	const jsonResponse: AuthResponse = await res.json();
	localStorage.setItem('token', jsonResponse.access_token);
	localStorage.setItem('refreshToken', jsonResponse.refresh_token);
	const expirationTime = moment().add(1, 'hour');
	localStorage.setItem(
		'tokenExpirationTime',
		expirationTime.toISOString(true)
	);
};

export const refetchToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	if (refreshToken == null) {
		localStorage.removeItem('token');
		throw new Error('Not authenticated properly');
	}
	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(username + ':' + password)
		},
		body: `grant_type=refresh_token&refresh_token=${refreshToken}`
	});
	const jsonResponse: AuthResponse = await res.json();
	setToken(jsonResponse.access_token);
	localStorage.setItem('token', jsonResponse.access_token);
	const expirationTime = moment().add(1, 'hour');
	localStorage.setItem(
		'tokenExpirationTime',
		expirationTime.toISOString(true)
	);
};
