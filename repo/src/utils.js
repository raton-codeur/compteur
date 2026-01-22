import { content, routes } from "./config.js";

export function render(path) {

  // afficher la bonne page selon le path
  const page = routes[path] ?? "<p>erreur 404 : route inconnue</p>";
  content.innerHTML = page;

  // mettre la classe "pressed" au bon élément
  document.querySelectorAll("[data-link]").forEach(a =>
    a.classList.toggle("pressed", a.getAttribute("href") === path)
  );
}
