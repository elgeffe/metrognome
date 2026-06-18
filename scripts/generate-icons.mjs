// Rasterizes the SVG logo into the PNG icons referenced by the PWA manifest.
// Run with: npm run gen:icons
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

function render(svgPath, size, outPath) {
	const svg = readFileSync(svgPath, 'utf8');
	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
	writeFileSync(outPath, resvg.render().asPng());
	console.log(`wrote ${outPath} (${size}px)`);
}

mkdirSync('static/icons', { recursive: true });
render('static/favicon.svg', 192, 'static/icons/icon-192.png');
render('static/favicon.svg', 512, 'static/icons/icon-512.png');
render('static/icons/icon-maskable.svg', 512, 'static/icons/icon-maskable-512.png');
