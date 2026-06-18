<script lang="ts">
	import { store } from '$lib/state/store.svelte';
	import type { AutomationMode } from '$lib/state/store.svelte';

	const modes: { id: AutomationMode; label: string }[] = [
		{ id: 'off', label: 'Off' },
		{ id: 'step', label: 'Step' },
		{ id: 'ramp-time', label: 'Ramp / time' },
		{ id: 'ramp-bars', label: 'Ramp / bars' }
	];

	const micOverriding = $derived(store.micActive && store.micFollow);
</script>

<section class="card">
	<div class="card-title">
		<span>Tempo Automation</span>
		{#if micOverriding}<span class="badge">mic is driving tempo</span>{/if}
	</div>

	<div class="seg" role="tablist" aria-label="Automation mode">
		{#each modes as m (m.id)}
			<button
				type="button"
				role="tab"
				aria-selected={store.automationMode === m.id}
				class:active={store.automationMode === m.id}
				onclick={() => (store.automationMode = m.id)}>{m.label}</button
			>
		{/each}
	</div>

	{#if store.automationMode === 'step'}
		<p class="hint">Speed trainer — nudge the tempo every few bars and push your limit.</p>
		<div class="fields">
			<div class="field">
				<label for="st-start">Start BPM</label>
				<input id="st-start" type="number" min="20" max="400" bind:value={store.stepStartBpm} />
			</div>
			<div class="field">
				<label for="st-step">Change BPM</label>
				<input id="st-step" type="number" min="-50" max="50" bind:value={store.stepAmount} />
			</div>
			<div class="field">
				<label for="st-every">Every (bars)</label>
				<input id="st-every" type="number" min="1" max="64" bind:value={store.stepEveryBars} />
			</div>
			<div class="field">
				<label for="st-mode">At limit</label>
				<select id="st-mode" bind:value={store.stepMode}>
					<option value="clamp">Hold</option>
					<option value="loop">Loop</option>
					<option value="bounce">Bounce</option>
				</select>
			</div>
			<div class="field">
				<label for="st-min">Min BPM</label>
				<input id="st-min" type="number" min="20" max="400" bind:value={store.stepMinBpm} />
			</div>
			<div class="field">
				<label for="st-max">Max BPM</label>
				<input id="st-max" type="number" min="20" max="400" bind:value={store.stepMaxBpm} />
			</div>
		</div>
	{:else if store.automationMode === 'ramp-time'}
		<p class="hint">Glide smoothly from one tempo to another over a set time.</p>
		<div class="fields">
			<div class="field">
				<label for="rt-start">From BPM</label>
				<input id="rt-start" type="number" min="20" max="400" bind:value={store.rampStartBpm} />
			</div>
			<div class="field">
				<label for="rt-end">To BPM</label>
				<input id="rt-end" type="number" min="20" max="400" bind:value={store.rampEndBpm} />
			</div>
			<div class="field span2">
				<label for="rt-sec">Over (seconds)</label>
				<input id="rt-sec" type="number" min="1" max="3600" bind:value={store.rampSeconds} />
			</div>
		</div>
	{:else if store.automationMode === 'ramp-bars'}
		<p class="hint">Glide smoothly from one tempo to another over a number of bars.</p>
		<div class="fields">
			<div class="field">
				<label for="rb-start">From BPM</label>
				<input id="rb-start" type="number" min="20" max="400" bind:value={store.rampStartBpm} />
			</div>
			<div class="field">
				<label for="rb-end">To BPM</label>
				<input id="rb-end" type="number" min="20" max="400" bind:value={store.rampEndBpm} />
			</div>
			<div class="field span2">
				<label for="rb-bars">Over (bars)</label>
				<input id="rb-bars" type="number" min="1" max="999" bind:value={store.rampBars} />
			</div>
		</div>
	{:else}
		<p class="hint">Tempo stays fixed at the value you set above.</p>
	{/if}

	<!-- gap-click / mute trainer -->
	<div class="gap">
		<div class="row spread">
			<div>
				<div class="gap-title">Gap-click trainer</div>
				<div class="faint small">Mutes bars so you keep time on your own.</div>
			</div>
			<button
				type="button"
				class="switch"
				data-on={store.gapEnabled}
				aria-pressed={store.gapEnabled}
				aria-label="Toggle gap-click trainer"
				onclick={() => (store.gapEnabled = !store.gapEnabled)}
			></button>
		</div>

		{#if store.gapEnabled}
			<div class="seg small-seg" role="tablist" aria-label="Gap mode">
				<button
					type="button"
					class:active={store.gapMode === 'cycle'}
					onclick={() => (store.gapMode = 'cycle')}>Cycle</button
				>
				<button
					type="button"
					class:active={store.gapMode === 'random'}
					onclick={() => (store.gapMode = 'random')}>Random</button
				>
			</div>
			{#if store.gapMode === 'cycle'}
				<div class="fields">
					<div class="field">
						<label for="gp-play">Play (bars)</label>
						<input id="gp-play" type="number" min="1" max="32" bind:value={store.gapPlayBars} />
					</div>
					<div class="field">
						<label for="gp-mute">Mute (bars)</label>
						<input id="gp-mute" type="number" min="1" max="32" bind:value={store.gapMuteBars} />
					</div>
				</div>
			{:else}
				<div class="field">
					<label for="gp-prob"
						>Mute chance — {Math.round(store.gapProbability * 100)}%</label
					>
					<input
						id="gp-prob"
						type="range"
						min="0"
						max="1"
						step="0.05"
						bind:value={store.gapProbability}
					/>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.hint {
		margin: 12px 0 4px;
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.fields {
		margin-top: 8px;
	}

	.span2 {
		grid-column: 1 / -1;
	}

	.gap {
		margin-top: 18px;
		padding-top: 16px;
		border-top: 1px solid var(--card-border);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.gap-title {
		font-weight: 700;
	}

	.small {
		font-size: 0.78rem;
	}

	.small-seg button {
		padding: 6px 10px;
		font-size: 0.8rem;
	}
</style>
