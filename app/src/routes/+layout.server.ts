import getLastName from '$lib/utils/getLastName';
import type { PageServerLoad } from './$types';

// TO DO: Remove alltags and refactor page template to fetch tags from layout
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	let query = `
	{
		"settings": *[_id == "siteSettings"][0]{ 
			about,
			announcement,
		},

		"artists": {
			"represented": *[_type == "artist" && represented == true] | order(title asc){
				title,
				slug,
				represented
			},
			"exhibited": *[_type == "artist" && represented != true] | order(title asc){
				title,
				slug,
				represented
			}
		},

		"exhibitions": *[_type == "exhibition"] | order(startDate desc){
			title,
			slug,
			startDate,
			endDate,
			venue,
			"artists": artist[]->title
		},

		"legal": *[_type == "legal"]{
			title,
			slug,
		}
	}
	`;

	let initial = await loadQuery(query);

	console.log('Initial data:', initial);

	initial.data.artists.represented.sort((a, b) =>
		getLastName(a.title).localeCompare(getLastName(b.title))
	);
	initial.data.artists.exhibited.sort((a, b) =>
		getLastName(a.title).localeCompare(getLastName(b.title))
	);

	return {
		query,
		options: { initial }
	};
};
