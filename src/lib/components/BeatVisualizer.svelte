<script lang="ts">
	import { store } from '$lib/state/store.svelte';

	const beats = $derived(Array.from({ length: Math.max(1, store.beatsPerBar) }, (_, i) => i));
</script>

<div
	class="beats"
	role="img"
	aria-label={store.isPlaying
		? `Beat ${store.currentBeat + 1} of ${store.beatsPerBar}`
		: `${store.beatsPerBar} beats per bar`}
>
	{#each beats as i (i)}
		<div
			class="beat"
			class:accent={i === 0 && store.accentFirst}
			class:active={store.isPlaying && store.currentBeat === i}
		></div>
	{/each}
</div>

<style>
	.beats {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		height: 30px;
		margin: 4px 0 2px;
	}

	.beat {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--bg-elev-2);
		box-shadow: inset 0 0 0 1px var(--card-border);
		transition:
			transform 0.08s ease,
			background 0.12s ease,
			box-shadow 0.12s ease;
	}

	.beat.accent {
		background: var(--bg-elev-2);
		box-shadow: inset 0 0 0 2px rgba(255, 209, 102, 0.5);
	}

	.beat.active {
		transform: scale(1.65);
		background: var(--accent-2);
		box-shadow: 0 0 18px 2px rgba(76, 201, 240, 0.55);
	}

	.beat.accent.active {
		background: var(--accent-beat);
		box-shadow: 0 0 20px 3px rgba(255, 209, 102, 0.6);
	}
</style>
