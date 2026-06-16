// A single shared AudioContext for the whole app. The metronome scheduler and
// the microphone tempo detector both run on this one high-resolution clock.

let ctx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
	if (!ctx) {
		const Ctor = window.AudioContext ?? window.webkitAudioContext;
		if (!Ctor) throw new Error('Web Audio API is not supported in this browser.');
		ctx = new Ctor();
	}
	return ctx;
}

/**
 * Mobile browsers start the AudioContext in a "suspended" state and only allow
 * it to resume from inside a user gesture. Call this from a click/tap handler.
 */
export async function resumeAudio(): Promise<void> {
	const c = getAudioContext();
	if (c.state !== 'running') {
		await c.resume();
	}
}
