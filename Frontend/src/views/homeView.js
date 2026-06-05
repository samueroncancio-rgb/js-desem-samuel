import Sidebar from "@/components/Sidebar";
import { getSession } from "../services/auth.service";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="mb-6">

          <h1 class="text-3xl font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-slate-500">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  id="btnManageReservations"
                  class="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium cursor-pointer transition-all active:scale-[0.98]"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
            : `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button
                  id="btnNewReservation"
                  class="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-sm shadow-green-100 hover:shadow font-medium cursor-pointer transition-all active:scale-[0.98]"
                >
                  Nueva Reserva
                </button>
              `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-500">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

      <!-- Modal de Creación de Reserva -->
      <div
        id="reservationModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div
          id="reservationModalPanel"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform scale-95 transition-transform duration-300 overflow-hidden border border-slate-100"
        >
          <!-- Encabezado del Modal -->
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Crear Nueva Reserva
            </h3>
            <button
              type="button"
              id="closeModalBtn"
              class="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Formulario -->
          <form id="reservationForm" class="p-6 space-y-4">
            <div>
              <label for="workspace" class="block text-sm font-semibold text-slate-700 mb-1">
                Espacio / Sala
              </label>
              <select
                id="workspace"
                name="workspace"
                required
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-slate-800"
              >
                <option value="" disabled selected>Selecciona un espacio...</option>
                <option value="Sala A">Sala A (Reuniones)</option>
                <option value="Sala B">Sala B (Capacitación)</option>
                <option value="Sala C">Sala C (Entrevistas)</option>
                <option value="Escritorio 1">Escritorio 1 (Individual)</option>
                <option value="Escritorio 2">Escritorio 2 (Individual)</option>
              </select>
            </div>

            <div>
              <label for="date" class="block text-sm font-semibold text-slate-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-slate-800"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="startHour" class="block text-sm font-semibold text-slate-700 mb-1">
                  Hora Inicio
                </label>
                <input
                  type="time"
                  id="startHour"
                  name="startHour"
                  required
                  class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-slate-800"
                />
              </div>

              <div>
                <label for="endHour" class="block text-sm font-semibold text-slate-700 mb-1">
                  Hora Fin
                </label>
                <input
                  type="time"
                  id="endHour"
                  name="endHour"
                  required
                  class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label for="reason" class="block text-sm font-semibold text-slate-700 mb-1">
                Motivo de la Reserva
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="3"
                required
                placeholder="Ej. Sprint Planning, Reunión con cliente, etc."
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all text-slate-800 resize-none"
              ></textarea>
            </div>

            

            <!-- Acciones -->
            <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                id="cancelModalBtn"
                class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-800 font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg font-semibold shadow-md shadow-green-100 hover:shadow transition-all cursor-pointer"
              >
                Crear Reserva
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal de Edición de Reserva -->
      <div
        id="editReservationModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div
          id="editReservationModalPanel"
          class="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform scale-95 transition-transform duration-300 overflow-hidden border border-slate-100"
        >
          <!-- Encabezado -->
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
              </svg>
              Editar Reserva
            </h3>
            <button
              type="button"
              id="closeEditModalBtn"
              class="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Formulario de Edición -->
          <form id="editReservationForm" class="p-6 space-y-4">
            <input type="hidden" id="editReservationId" name="id" />

            <div>
              <label for="editWorkspace" class="block text-sm font-semibold text-slate-700 mb-1">
                Espacio / Sala
              </label>
              <select
                id="editWorkspace"
                name="workspace"
                required
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800"
              >
                <option value="Sala A">Sala A (Reuniones)</option>
                <option value="Sala B">Sala B (Capacitación)</option>
                <option value="Sala C">Sala C (Entrevistas)</option>
                <option value="Escritorio 1">Escritorio 1 (Individual)</option>
                <option value="Escritorio 2">Escritorio 2 (Individual)</option>
              </select>
            </div>

            <div>
              <label for="editDate" class="block text-sm font-semibold text-slate-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                id="editDate"
                name="date"
                required
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="editStartHour" class="block text-sm font-semibold text-slate-700 mb-1">
                  Hora Inicio
                </label>
                <input
                  type="time"
                  id="editStartHour"
                  name="startHour"
                  required
                  class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800"
                />
              </div>
              <div>
                <label for="editEndHour" class="block text-sm font-semibold text-slate-700 mb-1">
                  Hora Fin
                </label>
                <input
                  type="time"
                  id="editEndHour"
                  name="endHour"
                  required
                  class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label for="editReason" class="block text-sm font-semibold text-slate-700 mb-1">
                Motivo de la Reserva
              </label>
              <textarea
                id="editReason"
                name="reason"
                rows="3"
                required
                class="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 resize-none"
              ></textarea>
            </div>

            <!-- Acciones -->
            <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                id="cancelEditModalBtn"
                class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-800 font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold shadow-md shadow-blue-100 hover:shadow transition-all cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;
}