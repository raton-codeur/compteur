let time = 0; // temps en ms

const chronoElement = document.getElementById('chrono');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', startChrono);
stopButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);

let running = false;

/*
setInterval exécute une fonction toutes les 10 ms jusqu'à ce qu'on l'arrête avec clearInterval. pour ça, clearInterval a besoin de l'id retourné par setInterval.

Date.now() -> timestamp courant en ms depuis le 1er janvier 1970.

start contient un timestamp équivalent au démarrage du chrono.

time = Date.now() - start = temps écoulé en ms depuis le démarrage du chrono.
*/

let intervalId = null; // pour pouvoir le réutiliser dans stopChrono

function startChrono() {
	if (running) return;
	running = true;
	const start = Date.now() - time;
	intervalId = setInterval(() => {
	time = Date.now() - start;
	display();
	}, 10);
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

function display() {
	chronoElement.textContent = formatTime(time);
}

function stopChrono() {
	if (!running) return;
	running = false;
	clearInterval(intervalId);
}

function resetChrono() {
	stopChrono();
	time = 0;
	display();
}
