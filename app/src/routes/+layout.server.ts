import getLastName from '$lib/utils/getLastName';
import type { PageServerLoad } from './$types';

// TO DO: Remove alltags and refactor page template to fetch tags from layout
export const load: PageServerLoad = async (event) => {
	const { preview, loadQuery } = event.locals;

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
				represented,
				"image": *[_type == "artwork" && references(^._id)][0].image.asset->url
			},
			"exhibited": *[_type == "artist" && represented != true] | order(title asc){
				title,
				slug,
				represented,
				"image": *[_type == "artwork" && references(^._id)][0].image.asset->url
			}
		},

		"exhibitions": *[_type == "exhibition"] | order(startDate desc){
			title,
			slug,
			startDate,
			endDate,
			venue,
			"artists": artist[]->title,
			"image": exhibitionImage.asset->url,
		},

		"legal": *[_type == "legal"]{
			title,
			slug,
		}
	}
	`;

	const initial = await loadQuery(
		query,
		{},
		{
			preview
		}
	);

	console.log('Initial data:', initial);

	initial.data.artists.represented.sort((a, b) =>
		getLastName(a.title).localeCompare(getLastName(b.title))
	);
	initial.data.artists.exhibited.sort((a, b) =>
		getLastName(a.title).localeCompare(getLastName(b.title))
	);

	return {
		preview,
		query,
		options: { initial },
		pathname: event.url.pathname
	};
};
