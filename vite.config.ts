import { sveltekit } from '@sveltejs/kit/vite';

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
  build: {
    outDir: "public_html",
  }
};

export default config;
