export function render(path) {

  // mettre la classe "pressed" au bon élément
  document.querySelectorAll("[data-link]").forEach(a =>
    a.classList.toggle("pressed", a.getAttribute("href") === path)
  );
}
