import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Unit tests target the framework-free engine modules (pure functions),
// so we deliberately avoid loading the SvelteKit plugin here. We still mirror
// the `$lib` alias so engine modules resolve the same way they do in the app.
export default defineConfig({
	resolve: {
		alias: {
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url))
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.ts'],
		environment: 'node'
	}
});
