import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { preview, loadQuery } = event.locals;

	const query = `
	{
		"allTags": array::unique(
			*[_type == "tag"]{ name, orderRank }
		) | order(orderRank asc),

		"siteSettings": *[_type == "settings"][0]{
			highlight { hex },
			mobileSettings {
				...
			}
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

	return {
		preview,
		query,
		options: {
			initial
		}
	};
};
