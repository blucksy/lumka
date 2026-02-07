let publicSanityDataset = 'production';
let publicSanityProjectId = 'uc7agiu3';

export function assertEnvVar<T>(value: T | undefined, name: string): T {
	if (value === undefined) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

export const dataset = assertEnvVar(publicSanityDataset, 'PUBLIC_SANITY_DATASET');

export const projectId = assertEnvVar(publicSanityProjectId, 'PUBLIC_SANITY_PROJECT_ID');

export const apiVersion = '2024-03-15';

export const studioUrl = 'https://amirhamja.sanity.studio/';
