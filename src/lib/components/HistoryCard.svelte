<script lang="ts">
	import { store } from '$lib/state/store.svelte';
	import { formatDuration } from '$lib/audio/timing';
	import type { PracticeSession } from '$lib/practice/types';

	const dateFmt = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	});

	function when(s: PracticeSession): string {
		return dateFmt.format(new Date(s.startedAt));
	}

	function goalText(s: PracticeSession): string {
		if (s.goal.type === 'bars') return `${s.goal.bars} bars`;
		if (s.goal.type === 'time') return `${formatDuration(s.goal.seconds ?? 0)}`;
		return '';
	}

	function bpmText(s: PracticeSession): string {
		return s.minBpm === s.maxBpm ? `${s.minBpm} BPM` : `${s.minBpm}–${s.maxBpm} BPM`;
	}

	function confirmClear() {
		if (confirm('Clear all practice history? This cannot be undone.')) store.clearHistory();
	}
</script>

<section class="card">
	<div class="card-title">
		<span>Practice Log</span>
		{#if store.sessions.length}
			<button type="button" class="btn btn-sm btn-ghost btn-danger" onclick={confirmClear}>
				Clear
			</button>
		{/if}
	</div>

	{#if store.sessions.length === 0}
		<p class="empty muted">
			No sessions yet. Hit <strong>Start</strong> and your practice — bars played and time — will be
			logged here automatically.
		</p>
	{:else}
		<div class="totals">
			<div><span class="t-num">{store.stats.totalSessions}</span><span class="t-lbl">sessions</span></div>
			<div>
				<span class="t-num">{formatDuration(store.stats.totalSeconds)}</span><span class="t-lbl"
					>total time</span
				>
			</div>
			<div><span class="t-num">{store.stats.totalBars}</span><span class="t-lbl">total bars</span></div>
		</div>

		<ul class="log">
			{#each store.sessions as s (s.id)}
				<li class="entry">
					<div class="entry-main">
						<div class="entry-top">
							<span class="entry-bars">{s.bars} bars</span>
							<span class="dot">·</span>
							<span>{formatDuration(s.durationSeconds)}</span>
							{#if s.goal.type !== 'none'}
								<span class="badge {s.goalReached ? 'good' : ''}">
									{s.goalReached ? '✓' : '◦'} {goalText(s)}
								</span>
							{/if}
						</div>
						<div class="entry-sub faint">
							{when(s)} · {bpmText(s)} · {s.timeSignature} · {s.automation}
						</div>
					</div>
					<button
						type="button"
						class="del"
						aria-label="Delete session"
						onclick={() => store.removeSession(s.id)}>✕</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.empty {
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.totals {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		margin-bottom: 16px;
	}

	.totals > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		background: var(--bg-elev);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-sm);
		padding: 10px;
	}

	.t-num {
		font-size: 1.2rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.t-lbl {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--text-faint);
	}

	.log {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.entry {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 0;
		border-top: 1px solid var(--card-border);
	}

	.entry:first-child {
		border-top: none;
	}

	.entry-main {
		flex: 1;
		min-width: 0;
	}

	.entry-top {
		display: flex;
		align-items: center;
		gap: 7px;
		font-weight: 600;
		flex-wrap: wrap;
	}

	.entry-bars {
		color: var(--text);
	}

	.dot {
		color: var(--text-faint);
	}

	.entry-sub {
		font-size: 0.76rem;
		margin-top: 3px;
	}

	.del {
		flex: none;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		color: var(--text-faint);
		font-size: 0.8rem;
	}

	.del:active {
		background: var(--bg-elev-2);
	}
</style>
