import { projectQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

// TO DO: Remove alltags and refactor page template to fetch tags from layout
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };

	const initial = await loadQuery(projectQuery, params);

	return {
		projectQuery,
		params,
		options: { initial }
	};
};
