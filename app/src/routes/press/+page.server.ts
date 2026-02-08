import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	const query = groq`*[_type == "press" && pressPage] | order(date desc) {
		...,
		"pdf": pdf.asset->url
	}`;
	const initial = await loadQuery(query);

	return {
		query,
		params: event.params,
		options: { initial }
	};
};
