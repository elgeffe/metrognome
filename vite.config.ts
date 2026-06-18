import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

// GitHub Pages serves project sites under a subpath (e.g. /metrognome/). The
// same base must drive both SvelteKit (svelte.config.js) and the service
// worker's navigation fallback so offline navigation resolves the right shell.
const base = process.env.BASE_PATH ?? '';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			strategies: 'generateSW',
			manifest: {
				name: 'Metrognome — Practice Metronome',
				short_name: 'Metrognome',
				description:
					'A modern metronome with tempo automation and bar/time practice tracking.',
				lang: 'en',
				theme_color: '#0f1115',
				background_color: '#0f1115',
				display: 'standalone',
				orientation: 'portrait',
				start_url: '.',
				scope: '.',
				categories: ['music', 'productivity', 'utilities'],
				icons: [
					{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
					{
						src: 'icons/icon-maskable-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,woff2}'],
				cleanupOutdatedCaches: true,
				// The SPA shell is written by adapter-static after the SW is generated,
				// so it isn't picked up by globPatterns. Precache the base URL itself
				// (a per-build revision busts it on each deploy) and bind navigations
				// to it. Deny asset/file requests so they never get the HTML fallback.
				additionalManifestEntries: [{ url: `${base}/`, revision: `shell-${Date.now()}` }],
				navigateFallback: `${base}/`,
				navigateFallbackDenylist: [/\/_app\//, /\.[^/]+$/]
			},
			devOptions: {
				enabled: false
			}
		})
	]
});
