import groq from 'groq';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	const { preview, loadQuery } = event.locals;

	const query = groq`*[_type == "homepage" ][0] {publications[]{...}}`;

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
