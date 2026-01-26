import { DOM } from "./define.js";
import { render } from "./utils.js";
import { startChrono, stopChrono, resetChrono } from "./chrono.js";

export function initEvents() {

	document.addEventListener("click", (e) => {

		// clic sur "up" ou "down"
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // clic avec une touche de modification
		if (e.button !== 0) return; // pas un clic gauche
		const a = e.target.closest('a[data-link]');
		if (!a) return; // pas un clic sur "up" ou "down"
		e.preventDefault();
		const selectedMenu = a.getAttribute("href");
		const URLParts = location.pathname.split("/");
		const nextMenu = (selectedMenu === URLParts[1]) ? "home" : selectedMenu;
		const nextPath = "/" + nextMenu + "/" + URLParts.slice(2, 5).join("/");
		render(nextPath);
	});

	// modification de la config via le menu
	DOM.config.addEventListener("input", (e) => {
		const parts = e.target.value.split(":");
		const hours = parseInt(parts[0], 10);
		const minutes = parseInt(parts[1], 10);
		const seconds = parseInt(parts[2], 10);
		const menu = location.pathname.split("/")[1];
		history.replaceState({}, "", `/${menu}/${hours}/${minutes}/${seconds}`);
	});

	window.addEventListener("popstate", () => {
		render(location.pathname);
	});

	DOM.resetConfigButton.addEventListener("click", () => {
		DOM.config.value = "00:00:00";
		const menu = location.pathname.split("/")[1];
		history.replaceState({}, "", `/${menu}/0/0/0`);
	});

	DOM.startButton.addEventListener("click", () => {
		startChrono();
	});

	DOM.stopButton.addEventListener("click", () => {
		stopChrono();
	});

	DOM.resetButton.addEventListener("click", () => {
		resetChrono();
	});
}
