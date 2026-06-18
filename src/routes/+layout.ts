// This is a fully client-side application: it relies on the Web Audio API,
// the microphone, and localStorage, none of which exist on the server. We
// therefore disable SSR and ship a single-page-app shell (see the
// adapter-static `fallback` option in svelte.config.js).
export const ssr = false;
export const prerender = false;
