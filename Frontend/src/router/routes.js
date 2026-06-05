import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import registerView from "@/views/registerView";

export const routes = {
  "/": {
    render: loginView,
    requiresAuth: false,
    redirectIfAuthenticated: true,
  },
  "/home": {
    render: homeView,
    requiresAuth: true,
  },
  "/register": {
    render: registerView,
    requiresAuth: false,
    redirectIfAuthenticated: true,
  }
};