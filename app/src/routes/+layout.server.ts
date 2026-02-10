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

	const initial = await loadQuery(query);

	return {
		query,
		options: { initial }
	};
};
