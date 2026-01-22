import {resetUp, resetDown} from './utils.js';
import {config, DOM} from './define.js';

resetUp();

DOM.startButton.addEventListener('click', start);
DOM.stopButton.addEventListener('click', stop);
DOM.resetButton.addEventListener('click', reset);

window.addEventListener('keydown', (event) => {
	if (event.repeat) return;
	if (event.code === 'Space') {
		event.preventDefault();
		if (running)
			stop();
		else
			start();
	}
	if (event.code === 'KeyR') {
		event.preventDefault();
		reset();
	}
});

DOM.resetConfigButton.addEventListener('click', () => {
	if (DOM.modeButton.value === 'up')
		resetUp();
	else
		resetDown();
});




function stop() {
	if (!running) return;
	running = false;
	if (animationId !== null) {
		cancelAnimationFrame(animationId);
		animationId = null;
	}
}

function reset() {
	if (mode.value === 'up')
	{
		stopChrono();
		time = configHours.value * 3600000 + configMinutes.value * 60000 + configSeconds.value * 1000;
		display();
	}
	else
	{
	}
}






/*
performance.now() → timestamp haute résolution en ms depuis le chargement de la page.

start contient un timestamp (haute résolution en ms depuis le chargement de la page) équivalent au démarrage du chrono.

quand le chrono tourne, on appelle une fonction ("loop") en boucle avec requestAnimationFrame. elle a un argument "timestamp" qui est un nouveau timestamp (haute résolution en ms depuis le chargement de la page). on peut calculer le temps écoulé depuis le démarrage du chrono avec :

time = timestamp (le paramètre de "loop") - start (le timestamp équivalent au démarrage du chrono)
*/

let time = 0; // temps en ms du chrono
let running = false;
let animationId = null; // le return de requestAnimationFrame. on peut arrêter le prochain appel de "loop" prévu avec cancelAnimationFrame(animationId)
let alerted = false;

function startChrono() {
	if (modeButton.value === 'up') {
		if ("Notification" in window) {
			if (Notification.permission === "default") {
				Notification.requestPermission();
			}
		}
		if (running) return;
		running = true;
		alerted = false;
		const start = performance.now() - time;
		function loop(timestamp) {
			if (!running) return;
			time = timestamp - start;
			chronoElement.textContent = formatTime(time);
			if (time >= MAX_TIME && !alerted) {
				alerted = true;
				if ("Notification" in window && Notification.permission === "granted") {
					new Notification("Chrono", {
						body: "time's up !"
					});
				}
				time = MAX_TIME;
				chronoElement.textContent = formatTime(time);
				time = 0;
				stopChrono();
				return;
			}
			animationId = requestAnimationFrame(loop);
		}
		animationId = requestAnimationFrame(loop);
	} else {
		// down mode
	}
}

function formatTime(ms) {
	const totalSeconds = Math.floor(ms / 1000);

	const hours   = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const centis = Math.floor((ms % 1000) / 10);

	const h = String(hours).padStart(2, '0');
	const m = String(minutes).padStart(2, '0');
	const s = String(seconds).padStart(2, '0');
	const c = String(centis).padStart(2, '0');

	return `${h}:${m}:${s}:${c}`;
}
