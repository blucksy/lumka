import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	const query = groq`*[_type == "press" && pressPage] | order(date desc) {
		...,
		"link": coalesce(pdf.asset->url, link),
	}`;
	const initial = await loadQuery(query);

	return {
		query,
		params: event.params,
		options: { initial }
	};
};
