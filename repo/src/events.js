import { render } from "./utils.js";

export function initEvents() {

	document.addEventListener("click", (e) => {
		// clic sur un lien de la SPA

		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // pas d'ouverture via un autre onglet. c'est le cas si on fait ctrl + clic par exemple.
		if (e.button !== 0) return; // pas un clic gauche

		const link = e.target instanceof Element ? e.target.closest("a[data-link]") : null; // l'élément (ou l'élément parent) qui a l'attribut data-link
		if (!link) return; // pas un lien de la SPA

		const href = link.getAttribute("href");
		const nextPath = (href === location.pathname) ? "/" : href;

		e.preventDefault();
		history.pushState({}, "", nextPath);
		render(nextPath);
	});

	window.addEventListener("popstate", () => {
		render(location.pathname);
	});
}
