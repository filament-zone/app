import { redirect } from '@sveltejs/kit';

import { PUBLIC_TWITTER_REDIRECT_URI, PUBLIC_TWITTER_CLIENT_ID } from '$env/static/public';

function generatePKCEChallenge(length = 43) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	let codeVerifier = '';
	for (let i = 0; i < length; i++) {
		codeVerifier += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return { codeVerifier, codeChallenge: codeVerifier }; // Простая версия (обычно хэшируется)
}

export async function GET({ cookies }) {
	const { codeVerifier, codeChallenge } = generatePKCEChallenge();

	cookies.set('code_verifier', codeVerifier, { path: '/', httpOnly: true });

	const twitterAuthUrl = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${PUBLIC_TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
		PUBLIC_TWITTER_REDIRECT_URI
	)}&scope=users.read%20tweet.read%20offline.access&state=random_string&code_challenge=${codeChallenge}&code_challenge_method=plain`;

	console.log('✅ Twitter OAuth: Запрос с сервера SvelteKit');
	console.log('👉 Code Verifier:', codeVerifier);
	console.log('👉 Redirecting to:', twitterAuthUrl);

	throw redirect(302, twitterAuthUrl);
}
