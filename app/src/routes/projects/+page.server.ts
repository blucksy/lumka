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
  "projects":
	*[
		_type == "project" &&
		 ${tags.length ? tags.map((tag) => `tag[]->name match "${tag}"`).join(' || ') : 'true'}
]| order(orderRank asc)   {
		"color": color.hex,
		"content": content[0..3]{
		...},
		"slug": slug.current,
		"tags": tag[]->name
		},
  "allTags": array::unique(
    *[_type == "tag"]{name, orderRank}
  ) | order(orderRank asc) 
	}
  
	`;

	const initial = await loadQuery(query, params);

	return {
		query,
		params,
		options: { initial }
	};
};
