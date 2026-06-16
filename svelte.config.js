import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Fully client-side app shipped as a static SPA so it can be hosted
		// anywhere (Cloudflare Pages, GitHub Pages, Netlify, ...) and cached
		// offline by the service worker.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// Set BASE_PATH at build time for project-page hosting (e.g. GitHub Pages).
			base: process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
