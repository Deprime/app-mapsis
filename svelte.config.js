// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import static_adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: static_adapter({
			pages: 'public_html',
			assets: 'public_html',
			fallback: 'index.html',
			precompress: false
		}),
    // outDir: "/public_html",
	},
};

export default config;
