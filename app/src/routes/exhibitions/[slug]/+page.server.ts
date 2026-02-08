import { projectQuery } from '$lib/sanity/queries';
import groq from 'groq';
import type { PageServerLoad } from './$types';

// TO DO: Remove alltags and refactor page template to fetch tags from layout
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };

	const initial = await loadQuery(
		groq`
		 *[_type == "exhibition" && slug.current == $slug][0] {
			...,
			artist[]->{
				...,
			},
			content[] {
				...,
			}
		}
		`,
		params
	);

	if (!initial) {
		return {
			status: 404,
			error: new Error('Exhibition not found')
		};
	}

	return {
		projectQuery,
		params,
		options: { initial }
	};
};
