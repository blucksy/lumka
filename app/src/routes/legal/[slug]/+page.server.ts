import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };

	const legalQuery = groq`
		 *[_type == "legal" && slug.current == $slug][0] {
			...,
		}
		`;

	const initial = await loadQuery(legalQuery, params);

	if (!initial) {
		return {
			status: 404,
			error: new Error('Legal page not found')
		};
	}

	return {
		legalQuery,
		options: { initial }
	};
};
