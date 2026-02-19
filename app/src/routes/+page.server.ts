import groq from 'groq';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	const query = groq`*[_type == "homepage" ][0] {publications[]{...}}`;

	const initial = await loadQuery(query);

	return {
		query,
		options: {
			initial
		}
	};
};
