<script lang="ts">
	import { store } from '$lib/state/store.svelte';
	import type { GoalType } from '$lib/practice/types';

	function setGoal(type: GoalType) {
		store.goalType = type;
		store.goalJustReached = false;
	}
</script>

<section class="card" class:celebrate={store.goalJustReached}>
	<div class="card-title">
		<span>Practice Tracker</span>
		{#if store.goalJustReached}
			<span class="badge good">✓ Goal reached</span>
		{/if}
	</div>

	<div class="seg" role="tablist" aria-label="Goal type">
		<button
			type="button"
			role="tab"
			aria-selected={store.goalType === 'none'}
			class:active={store.goalType === 'none'}
			onclick={() => setGoal('none')}>Open</button
		>
		<button
			type="button"
			role="tab"
			aria-selected={store.goalType === 'bars'}
			class:active={store.goalType === 'bars'}
			onclick={() => setGoal('bars')}>By bars</button
		>
		<button
			type="button"
			role="tab"
			aria-selected={store.goalType === 'time'}
			class:active={store.goalType === 'time'}
			onclick={() => setGoal('time')}>By time</button
		>
	</div>

	{#if store.goalType === 'bars'}
		<div class="field tgt">
			<label for="goal-bars">Target — bars to play</label>
			<input id="goal-bars" type="number" min="1" max="9999" bind:value={store.goalBars} />
		</div>
	{:else if store.goalType === 'time'}
		<div class="field tgt">
			<label for="goal-min">Target — minutes to practice</label>
			<input
				id="goal-min"
				type="number"
				min="1"
				max="600"
				step="1"
				bind:value={store.goalMinutes}
			/>
		</div>
	{/if}

	<div class="live-counters">
		<div class="counter">
			<span class="big">{store.sessionBars}</span>
			<span class="lbl">bars played</span>
		</div>
		<div class="counter">
			<span class="big">{store.elapsedLabel}</span>
			<span class="lbl">time elapsed</span>
		</div>
	</div>

	{#if store.goalType !== 'none'}
		<div class="progress" aria-hidden="true">
			<div class="progress-fill" style={`width:${store.goalProgress * 100}%`}></div>
		</div>
		<div class="row spread foot">
			<span class="muted">{store.goalRemainingLabel}</span>
			<span class="faint">{Math.round(store.goalProgress * 100)}%</span>
		</div>
	{:else}
		<p class="foot muted">
			Open practice — counting bars and time with no target. Switch to a goal to auto-stop when you
			hit it.
		</p>
	{/if}
</section>

<style>
	.tgt {
		margin-top: 14px;
	}

	.live-counters {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 16px;
	}

	.counter {
		background: var(--bg-elev);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-sm);
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: center;
	}

	.big {
		font-size: 2.1rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.lbl {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
	}

	.progress {
		margin-top: 16px;
		height: 10px;
		border-radius: 999px;
		background: var(--bg-elev-2);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 999px;
		background: var(--accent-grad);
		transition: width 0.2s ease;
	}

	.foot {
		margin-top: 10px;
		font-size: 0.85rem;
	}

	.celebrate {
		animation: pop 0.5s ease;
		box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.4);
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.015);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
