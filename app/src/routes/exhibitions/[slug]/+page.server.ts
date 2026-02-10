import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };

	const projectQuery = groq`
		 *[_type == "exhibition" && slug.current == $slug][0] {
			...,
			"extraLinks": extraLinks[] {
				label,
				"url": coalesce(file.asset->url, url),
			},

			artist[]->{
				...,
			},
			content[] {
				"aspectRatio": asset->metadata.dimensions.aspectRatio,
				...,
			},
			works[]-> {
				"aspectRatio": image.asset->metadata.dimensions.aspectRatio,
				description,
				image,
				title,
				year,
				artist-> {
					title,
					slug
				}
			},
			press[]-> {
				title,
				"link": coalesce(pdf.asset->url, link),
				author,
				publication,
				date
			},
			"allExhibitions": *[_type == "exhibition"] | order(startDate desc) {
				title,
				slug,
				startDate,
				endDate,
				venue
			},
			}
		`;

	const initial = await loadQuery(projectQuery, params);

	if (!initial) {
		return {
			status: 404,
			error: new Error('Exhibition not found')
		};
	}

	return {
		projectQuery,
		options: { initial }
	};
};
