import { formatTime } from "./utils.js";
import { DOM } from "./define.js";

/* "start"
contient un timestamp
(haute résolution en ms depuis le chargement de la page)
équivalent au démarrage du chrono.

quand le chrono tourne,
on appelle une fonction ("loop")
en boucle avec requestAnimationFrame.
elle a un argument "timestamp"
qui est un nouveau timestamp
(haute résolution en ms depuis le chargement de la page).
on peut calculer le temps écoulé depuis le démarrage du chrono avec :
time = timestamp (le paramètre de "loop") - start (le timestamp équivalent au démarrage du chrono)
*/

let time = 0; // temps en ms du chrono
let running = false;
let animationId = null; // le return de requestAnimationFrame. on peut arrêter le prochain appel de "loop" prévu avec cancelAnimationFrame(animationId)

export function startChrono() {
	if (running) return;
	running = true;
	const start = performance.now() - time;
	function loop(timestamp) {
		if (!running) return;
		time = timestamp - start;
		DOM.chrono.textContent = formatTime(time);
		animationId = requestAnimationFrame(loop);
	}
	animationId = requestAnimationFrame(loop);
}

export function stopChrono() {
	if (!running) return;
	running = false;
	if (animationId != null) {
		cancelAnimationFrame(animationId);
		animationId = null;
	}
}

export function resetChrono() {
	stopChrono();
	time = 0;
	DOM.chrono.textContent = formatTime(time);
}
