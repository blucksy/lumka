import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };

	const artistQuery = groq`
		 *[_type == "artist" && slug.current == $slug][0] {
			...,
			"links": links[] {
				label,
				"url": coalesce(file.asset->url, url),
			},
			"works": *[_type == "artwork" && references(^._id)] {
				"aspectRatio": image.asset->metadata.dimensions.aspectRatio,
				description,
				image,
				title,
				year,
				"startDate": *[_type == "exhibition" && references(^._id)] | order(startDate asc)[0].startDate,
			} | order(startDate asc),
			press[]-> {
				title,
				"link": coalesce(pdf.asset->url, link),
				author,
				publication,
				date
			},
			"exhibitions": *[_type == "exhibition" && references(^._id)] {
				"artists": artist[]->title,
				title,
				slug,
				startDate,
				endDate,
				venue,
			},
		}
		`;

	const initial = await loadQuery(artistQuery, params);

	if (!initial) {
		return {
			status: 404,
			error: new Error('Exhibition not found')
		};
	}

	return {
		artistQuery,
		options: { initial }
	};
};
