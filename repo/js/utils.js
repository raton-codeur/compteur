import { DOM } from "./define.js";

function setURLAndConfig(menu, hours, minutes, seconds) {
	const target = `/${menu}/${hours}/${minutes}/${seconds}`;
	if (location.pathname !== target)
		history.replaceState({}, "", target);
	DOM.config.value =
		`${String(hours).padStart(2, '0')}:` +
		`${String(minutes).padStart(2, '0')}:` +
		`${String(seconds).padStart(2, '0')}`;
}

function parseAndClamp(s, min, max) {
	const n = parseInt(s, 10) || 0;
	return Math.max(min, Math.min(max, n));
}

export function render(pathname) {

  // mettre la classe "pressed" au bon élément
  document.querySelectorAll("[data-link]").forEach(a =>
    a.classList.toggle("pressed", pathname.startsWith("/" + a.getAttribute("href") + "/"))
  );

	// set URL et config
	const parts = pathname.split("/");
	let menu = "home", hours = 0, minutes = 0, seconds = 0;
	if (parts.length === 5) {
		if (parts[1] === "up" || parts[1] === "down")
			menu = parts[1];
		hours = parseAndClamp(parts[2], 0, 23);
		minutes = parseAndClamp(parts[3], 0, 59);
		seconds = parseAndClamp(parts[4], 0, 59);
	}
	setURLAndConfig(menu, hours, minutes, seconds);

	// masquer la config et le chrono pour le menu "home"
	if (menu === "home")
		DOM.configAndChronoSections.forEach(section => section.style.display = "none");
	else
		DOM.configAndChronoSections.forEach(section => section.style.display = "flex");
}

export function formatTime(ms) {
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
