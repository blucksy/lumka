<script>
	export let title = '';
	export let description = '';
	export let image = '';
	export let alt = '';
	export let product = null;
	export let slug = '';

	let url = 'https://amirhamja.com';
	let name = 'LUmkA';
	let defaultDesc =
		'Explore work from LUmkA, an award-winning photographer based in New York City.';

	title = title ? title + ' | ' + name : name;
	description = description || defaultDesc;
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="title" content={title} />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta property="og:image" content={image || '/social.png'} />
	<meta name="twitter:image" content={image || '/social.png'} />

	<meta name="twitter:image:alt" content={alt || description} />

	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />

	<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="LUmkA" />
	<link rel="manifest" href="/favicon/site.webmanifest" />
</svelte:head>
