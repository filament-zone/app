import { json, redirect } from '@sveltejs/kit';
import {
	PUBLIC_TWITTER_REDIRECT_URI,
	PUBLIC_TWITTER_CLIENT_SECRET,
	PUBLIC_TWITTER_CLIENT_ID
} from '$env/static/public';

export async function GET({ url, cookies }) {
	const code = url.searchParams.get('code');
	const codeVerifier = cookies.get('code_verifier');

	if (!code || !codeVerifier) return json({ error: 'Invalid request' }, { status: 400 });

	const response = await fetch('https://api.x.com/2/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: PUBLIC_TWITTER_CLIENT_ID,
			client_secret: PUBLIC_TWITTER_CLIENT_SECRET,
			redirect_uri: PUBLIC_TWITTER_REDIRECT_URI,
			grant_type: 'authorization_code',
			code,
			code_verifier: codeVerifier
		})
	});

	const data = await response.json();
	console.log('data,', data);
	if (!data.access_token) return json({ error: 'Failed to authenticate' }, { status: 400 });

	const userResponse = await fetch('https://api.x.com/2/users/me', {
		headers: {
			Authorization: `Bearer ${data.access_token}`
		}
	});

	const userData = await userResponse.json();

	if (!userData.data?.id) return json({ error: 'Failed to get user data' }, { status: 400 });

	cookies.set('twitter_id', userData.data.id, { path: '/', httpOnly: true });

	throw redirect(302, '/overview');
}
