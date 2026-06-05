import { registerController } from "@/controllers/register.controller";

export default function registerView() {
  setTimeout(() => {
    registerController();
  });

  return `
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-5 text-slate-800">
          Registro
        </h1>

        <form id="registerForm">

          <input
            type="text"
            name="name"
            placeholder="Nombre Completo"
            class="border w-full p-2 rounded mb-3"
            required
          >

          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            class="border w-full p-2 rounded mb-3"
            required
          >

          <select name="role" id="role"  class="border w-full p-2 rounded mb-3">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            class="border w-full p-2 rounded mb-3"
            required
          >

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            class="border w-full p-2 rounded mb-4"
            required
          >

          

          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded cursor-pointer transition-colors"
          >
            Crear Cuenta
          </button>

          <button
            id="toLoginBtn"
            type="button"
            class="bg-slate-500 hover:bg-slate-600 text-white w-full py-2 rounded mt-3 cursor-pointer text-center block transition-colors"
          >
            Volver al Login
          </button>

        </form>

      </div>

    </div>
  `;
}
