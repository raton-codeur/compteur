const app = document.getElementById("app");

const routes = {
  "/up": "<p>blabla compteur up</p>",
  "/down": "<p>blabla compteur down</p>",
  "/": ""
};

function render(path) {

  // afficher la bonne page selon le path
  const page = routes[path] ?? "<p>erreur 404 : route inconnue</p>";
  app.innerHTML = page;

  // mettre la classe "pressed" au bon élément
  document.querySelectorAll("[data-link]").forEach(a =>
    a.classList.toggle("pressed", a.getAttribute("href") === path)
  );
}

document.addEventListener("click", (e) => {
  // clique sur un lien de la SPA

  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // pas d'ouverture via un autre onglet. c'est le cas si on fait ctrl + clique par exemple.
  if (e.button !== 0) return; // pas un clique gauche

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

render(location.pathname);
