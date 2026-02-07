import type { PageServerLoad } from './$types';

// TO DO: Remove alltags and refactor page template to fetch tags from layout
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	let tags: string[] = [];

	if (event.url.searchParams) {
		tags = event.url.searchParams.getAll('tag');
	}

	let query = `
	{
  "allTags": array::unique(
    *[_type == "tag"]{name, orderRank}
  ) | order(orderRank asc) ,
	"siteSettings" : *[_type == "settings"][0]{
		highlight {hex},
		mobileSettings {
		...
		}	
}
  }
  
	`;

	const initial = await loadQuery(query, params);

	return {
		query,
		params,
		options: { initial }
	};
};
