import {
	MAILCHIMP_API_KEY,
	MAILCHIMP_AUDIENCE_ID,
	MAILCHIMP_SERVER_PREFIX
} from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	const response = await fetch(
		`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${MAILCHIMP_API_KEY}`
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed'
			})
		}
	);

	if (!response.ok) {
		const error = await response.json();
		return new Response(JSON.stringify(error), { status: 400 });
	}

	return new Response(JSON.stringify({ success: true }));
};
