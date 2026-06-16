import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

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
				navigateFallback: '/',
				cleanupOutdatedCaches: true
			},
			devOptions: {
				enabled: false
			}
		})
	]
});
