import { navigateTo } from "@/router/router";
import { getUsers, registerUser } from "@services/user.service";

export const registerController = () => {
  const form = document.querySelector("#registerForm");
  const toLoginBtn = document.querySelector("#toLoginBtn");

  if (toLoginBtn) {
    toLoginBtn.addEventListener("click", () => {
      navigateTo("/");
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
      const confirmPassword = form.confirmPassword.value.trim();
      const role = form.role.value.trim();

      // Validations
      if (!name || !email || !password || !confirmPassword || !role) {
        alert("Todos los campos son obligatorios");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      try {
        // Check if email already exists
        const users = await getUsers();
        const emailExists = users.some(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
          alert("El correo electrónico ya está registrado");
          return;
        }

        // Register user
        await registerUser({
          name,
          email,
          password,
          role,
        });

        alert("Usuario registrado exitosamente");
        navigateTo("/");
      } catch (error) {
        console.error(error);
        alert("Error al registrar el usuario");
      }
    });
  }
};
