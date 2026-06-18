<script lang="ts">
	import { store } from '$lib/state/store.svelte';

	const subdivisions = [
		{ v: 1, label: 'None' },
		{ v: 2, label: 'Eighths' },
		{ v: 3, label: 'Triplets' },
		{ v: 4, label: '16ths' }
	];
</script>

<section class="card">
	<div class="card-title"><span>Meter &amp; Sound</span></div>

	<div class="fields">
		<div class="field">
			<label for="bpb">Beats per bar</label>
			<input id="bpb" type="number" min="1" max="16" bind:value={store.beatsPerBar} />
		</div>
		<div class="field">
			<label for="unit">Beat unit</label>
			<select id="unit" bind:value={store.beatUnit}>
				<option value={2}>2 — half</option>
				<option value={4}>4 — quarter</option>
				<option value={8}>8 — eighth</option>
			</select>
		</div>
	</div>

	<div class="field sub">
		<label for="sub">Subdivision</label>
		<select id="sub" bind:value={store.subdivision}>
			{#each subdivisions as s (s.v)}
				<option value={s.v}>{s.label}</option>
			{/each}
		</select>
	</div>

	<div class="row spread toggle-row">
		<span>Accent first beat</span>
		<button
			type="button"
			class="switch"
			data-on={store.accentFirst}
			aria-pressed={store.accentFirst}
			aria-label="Toggle accent on first beat"
			onclick={() => (store.accentFirst = !store.accentFirst)}
		></button>
	</div>

	<div class="field">
		<label for="vol">Volume — {Math.round(store.volume * 100)}%</label>
		<input id="vol" type="range" min="0" max="1" step="0.01" bind:value={store.volume} />
	</div>
</section>

<style>
	.sub {
		margin-top: 12px;
	}

	.toggle-row {
		margin: 16px 0;
		font-weight: 600;
	}
</style>
