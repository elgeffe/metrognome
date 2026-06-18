<script lang="ts">
	import { onMount } from 'svelte';
	import { store } from '$lib/state/store.svelte';
	import TransportCard from '$lib/components/TransportCard.svelte';
	import PracticeGoalCard from '$lib/components/PracticeGoalCard.svelte';
	import AutomationCard from '$lib/components/AutomationCard.svelte';
	import MicCard from '$lib/components/MicCard.svelte';
	import SoundCard from '$lib/components/SoundCard.svelte';
	import HistoryCard from '$lib/components/HistoryCard.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wakeLock: any = null;

	async function requestWakeLock() {
		try {
			// keep the screen awake so the beat stays visible while practising
			if ('wakeLock' in navigator && !wakeLock) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				wakeLock = await (navigator as any).wakeLock.request('screen');
			}
		} catch {
			/* not supported / denied — harmless */
		}
	}

	function releaseWakeLock() {
		try {
			wakeLock?.release?.();
		} catch {
			/* ignore */
		}
		wakeLock = null;
	}

	function onKey(e: KeyboardEvent) {
		const target = e.target as HTMLElement | null;
		const typing =
			target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.isContentEditable);
		if (e.code === 'Space' && !typing) {
			e.preventDefault();
			store.toggle();
		}
	}

	onMount(() => {
		store.init();
		window.addEventListener('keydown', onKey);
		const onVisible = () => {
			if (document.visibilityState === 'visible' && store.isPlaying) requestWakeLock();
		};
		document.addEventListener('visibilitychange', onVisible);
		return () => {
			window.removeEventListener('keydown', onKey);
			document.removeEventListener('visibilitychange', onVisible);
			releaseWakeLock();
		};
	});

	$effect(() => {
		if (store.isPlaying) requestWakeLock();
		else releaseWakeLock();
	});
</script>

<svelte:head>
	<title>Metrognome — practice metronome</title>
</svelte:head>

<main class="app">
	<header class="masthead">
		<div class="logo" aria-hidden="true">◳</div>
		<div>
			<h1>Metrognome</h1>
			<p class="tagline">Practice metronome · tempo automation · bar &amp; time tracking</p>
		</div>
	</header>

	<TransportCard />
	<PracticeGoalCard />
	<AutomationCard />
	<MicCard />
	<SoundCard />
	<HistoryCard />

	<footer class="foot faint">
		Runs offline · install to your home screen for an app-like experience. Press
		<kbd>Space</kbd> to start / stop.
	</footer>
</main>

<style>
	.masthead {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 4px 2px 0;
	}

	.logo {
		width: 44px;
		height: 44px;
		flex: none;
		display: grid;
		place-items: center;
		font-size: 1.5rem;
		border-radius: 12px;
		background: var(--accent-grad);
		color: #0a0c10;
		box-shadow: 0 8px 22px -10px var(--accent);
	}

	h1 {
		font-size: 1.45rem;
	}

	.tagline {
		margin: 2px 0 0;
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	.foot {
		text-align: center;
		font-size: 0.78rem;
		line-height: 1.6;
		padding: 8px 0 4px;
	}

	kbd {
		font-family: inherit;
		font-size: 0.72rem;
		padding: 1px 6px;
		border-radius: 6px;
		background: var(--bg-elev-2);
		border: 1px solid var(--card-border);
	}
</style>
