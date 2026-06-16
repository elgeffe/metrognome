<script lang="ts">
	import { store } from '$lib/state/store.svelte';

	const confidencePct = $derived(Math.round(store.micConfidence * 100));
</script>

<section class="card">
	<div class="card-title">
		<span>Reactive Tempo</span>
		<span class="badge tag-exp">Experimental</span>
	</div>

	<p class="hint">
		Listens through your microphone, detects the tempo you're playing, and follows along.
		Works best with a clear, percussive source (drums, claps, palm-muted strums).
	</p>

	<button
		type="button"
		class="btn"
		class:btn-primary={store.micActive}
		onclick={() => store.toggleMic()}
	>
		{store.micActive ? '● Listening — tap to stop' : '🎤 Enable microphone'}
	</button>

	{#if store.micError}
		<p class="err">{store.micError}</p>
	{/if}

	{#if store.micActive}
		<div class="meter" aria-hidden="true">
			<div class="meter-fill" style={`width:${Math.min(100, store.micLevel * 100)}%`}></div>
		</div>

		<div class="detected">
			<div class="d-main">
				<span class="d-num">{store.micDetectedBpm || '—'}</span>
				<span class="d-unit">BPM detected</span>
			</div>
			<div class="conf">
				<div class="conf-bar"><div style={`width:${confidencePct}%`}></div></div>
				<span class="faint small">{confidencePct}% confidence</span>
			</div>
		</div>

		<div class="row spread follow-row">
			<div>
				<div class="f-title">Follow my tempo</div>
				<div class="faint small">Continuously match the metronome to what it hears.</div>
			</div>
			<button
				type="button"
				class="switch"
				data-on={store.micFollow}
				aria-pressed={store.micFollow}
				aria-label="Toggle follow my tempo"
				onclick={() => (store.micFollow = !store.micFollow)}
			></button>
		</div>

		{#if !store.micFollow}
			<button
				type="button"
				class="btn btn-sm"
				disabled={!store.micDetectedBpm}
				onclick={() => store.adoptMicTempo()}
			>
				Set metronome to {store.micDetectedBpm || '—'} BPM
			</button>
		{/if}
	{/if}
</section>

<style>
	.hint {
		margin: 0 0 14px;
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.err {
		margin: 12px 0 0;
		color: var(--danger);
		font-size: 0.85rem;
	}

	.meter {
		margin-top: 16px;
		height: 8px;
		border-radius: 999px;
		background: var(--bg-elev-2);
		overflow: hidden;
	}

	.meter-fill {
		height: 100%;
		background: var(--accent-grad);
		transition: width 0.05s linear;
	}

	.detected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-top: 16px;
	}

	.d-num {
		font-size: 2.4rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.d-unit {
		display: block;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
	}

	.conf {
		flex: 1;
		max-width: 160px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: flex-end;
	}

	.conf-bar {
		width: 100%;
		height: 6px;
		border-radius: 999px;
		background: var(--bg-elev-2);
		overflow: hidden;
	}

	.conf-bar > div {
		height: 100%;
		background: var(--good);
		transition: width 0.2s ease;
	}

	.small {
		font-size: 0.78rem;
	}

	.follow-row {
		margin-top: 18px;
		padding-top: 16px;
		border-top: 1px solid var(--card-border);
	}

	.f-title {
		font-weight: 700;
	}

	.btn-sm {
		margin-top: 12px;
		width: 100%;
	}
</style>
