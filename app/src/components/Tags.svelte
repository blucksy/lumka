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

	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/favicon/site.webmanifest" />
	<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#58595b" />
	<link rel="shortcut icon" href="/favicon/favicon.ico" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
</svelte:head>
