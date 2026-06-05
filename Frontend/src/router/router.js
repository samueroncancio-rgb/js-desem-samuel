
import NotFoundView from "@/views/notFound";
import { isAuthenticated } from "../services/auth.service";
import { routes } from "./routes";

// Vista por defecto para rutas no encontradas
export const notFoundViews = NotFoundView;

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  let path = window.location.pathname;
  let route = routes[path];

  if (!route) {
    app.innerHTML = notFoundViews();
    // Vincular botón para volver a la página de inicio desde el 404
    const goHomeBtn = document.querySelector("#goHome");
    if (goHomeBtn) {
      goHomeBtn.addEventListener("click", () => {
        navigateTo(isAuthenticated() ? "/home" : "/");
      });
    }
    return;
  }

  if (route.requiresAuth && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    route = routes["/"];
  } else if (route.redirectIfAuthenticated && isAuthenticated()) {
    history.replaceState({}, "", "/home");
    route = routes["/home"];
  }

  app.innerHTML = route.render();
};

window.addEventListener("popstate", router);
