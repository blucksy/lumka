import type { LayoutServerLoad } from './$types';
import { homeQuery } from '$lib/sanity/queries';
export const load: LayoutServerLoad = async (event) => {
	const { preview, loadQuery } = event.locals;

	const query = homeQuery;

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
