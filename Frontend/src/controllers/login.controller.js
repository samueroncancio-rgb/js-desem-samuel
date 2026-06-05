import { saveSession } from "../services/auth.service";
import { navigateTo } from "@/router/router"
import { getUsers } from "../services/user.service";

export const loginController = () => {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const users = await getUsers()

      const user = users.find( (user) => user.email === email && user.password === password);

      if (!user) {
        alert("Credenciales incorrectas");
        return;
      }

      saveSession({
        id: user.id,
        name: user.name,
        role: user.role,
      });

      navigateTo("/home");
    } catch (error) {
      console.error(error);
      alert("Error conectando con la API");
    }
  });

  const toRegisterBtn = document.querySelector("#toRegisterBtn");
  if (toRegisterBtn) {
    toRegisterBtn.addEventListener("click", () => {
      navigateTo("/register");
    });
  }
};
