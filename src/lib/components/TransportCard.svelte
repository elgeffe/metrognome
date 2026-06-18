<script lang="ts">
	import { store } from '$lib/state/store.svelte';
	import BeatVisualizer from './BeatVisualizer.svelte';

	const showLive = $derived(
		store.isPlaying && (store.automationMode !== 'off' || (store.micActive && store.micFollow))
	);
</script>

<section class="card hero">
	<div class="bpm-wrap">
		<div class="bpm">
			<span class="bpm-num">{store.bpm}</span>
			<span class="bpm-unit">BPM</span>
		</div>
		{#if showLive}
			<div class="live">playing&nbsp;<strong>{store.liveBpm}</strong></div>
		{/if}
	</div>

	<BeatVisualizer />

	<input
		class="tempo-slider"
		type="range"
		min="20"
		max="300"
		step="1"
		bind:value={store.bpm}
		aria-label="Tempo in beats per minute"
	/>

	<div class="tempo-buttons">
		<button type="button" class="btn btn-sm" onclick={() => store.nudgeBpm(-5)}>−5</button>
		<button type="button" class="btn btn-sm" onclick={() => store.nudgeBpm(-1)}>−1</button>
		<button type="button" class="btn btn-sm" onclick={() => store.nudgeBpm(1)}>+1</button>
		<button type="button" class="btn btn-sm" onclick={() => store.nudgeBpm(5)}>+5</button>
		<button type="button" class="btn btn-sm tap" onclick={() => store.tap()}>Tap</button>
	</div>

	<button type="button" class="btn btn-primary play" onclick={() => store.toggle()}>
		{store.isPlaying ? '■ Stop' : '▶ Start'}
	</button>

	<div class="session-readout">
		<div class="stat">
			<span class="stat-num">{store.sessionBars}</span>
			<span class="stat-label">bars played</span>
		</div>
		<div class="stat divider">
			<span class="stat-num">{store.elapsedLabel}</span>
			<span class="stat-label">elapsed</span>
		</div>
		<div class="stat">
			<span class="stat-num">{store.isPlaying ? store.liveBpm : store.bpm}</span>
			<span class="stat-label">bpm now</span>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: stretch;
		text-align: center;
	}

	.bpm-wrap {
		position: relative;
		padding-top: 4px;
	}

	.bpm {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 8px;
	}

	.bpm-num {
		font-size: 4.4rem;
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.04em;
		background: var(--accent-grad);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-variant-numeric: tabular-nums;
	}

	.bpm-unit {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text-faint);
		letter-spacing: 0.1em;
	}

	.live {
		margin-top: 2px;
		font-size: 0.82rem;
		color: var(--accent-2);
	}

	.tempo-slider {
		margin: 2px 0;
	}

	.tempo-buttons {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
	}

	.tempo-buttons .tap {
		background: var(--accent-soft);
		box-shadow: inset 0 0 0 1px rgba(124, 92, 255, 0.4);
		font-weight: 700;
	}

	.play {
		font-size: 1.15rem;
		padding: 16px;
		letter-spacing: 0.02em;
	}

	.session-readout {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		padding-top: 4px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.stat.divider {
		border-left: 1px solid var(--card-border);
		border-right: 1px solid var(--card-border);
	}

	.stat-num {
		font-size: 1.5rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
	}
</style>
