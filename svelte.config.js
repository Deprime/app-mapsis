// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
// import static_adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// adapter: static_adapter({
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: 'index.html',
		// 	precompress: false
		// }),
	},
};

export default config;
