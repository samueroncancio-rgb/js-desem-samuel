import ReservationCard from "@components/ReservationCard";
import { getReservations, createReservations, updateReservation, deleteReservation } from "@services/reservation.service";
import { getSession } from "../services/auth.service";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();
  let isManaging = false;

  // Carga y renderiza las reservas
  async function loadReservations() {
    const reservations = user.role === "admin"
      ? await getReservations()
      : await getReservations(user.id);

    container.innerHTML = reservations.length
      ? reservations.map((r) => ReservationCard(r, isManaging, user.role)).join("")
      : `
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay reservas disponibles</p>
        </div>
      `;
    setupCardActions();
  }

  await loadReservations();

  // =============================================
  // HELPERS: Abrir / Cerrar modal de creación
  // =============================================
  const modal = document.querySelector("#reservationModal");
  const modalPanel = document.querySelector("#reservationModalPanel");
  const btnNewReservation = document.querySelector("#btnNewReservation");
  const closeModalBtn = document.querySelector("#closeModalBtn");
  const cancelModalBtn = document.querySelector("#cancelModalBtn");
  const form = document.querySelector("#reservationForm");

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove("pointer-events-none", "opacity-0");
    modal.classList.add("pointer-events-auto", "opacity-100");
    if (modalPanel) {
      modalPanel.classList.remove("scale-95");
      modalPanel.classList.add("scale-100");
    }
    const dateInput = document.querySelector("#date");
    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("pointer-events-auto", "opacity-100");
    modal.classList.add("pointer-events-none", "opacity-0");
    if (modalPanel) {
      modalPanel.classList.remove("scale-100");
      modalPanel.classList.add("scale-95");
    }
    if (form) form.reset();
  };

  if (btnNewReservation) btnNewReservation.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (modalPanel && !modalPanel.contains(e.target)) closeModal();
    });
  }

  const btnManageReservations = document.querySelector("#btnManageReservations");
  if (btnManageReservations) {
    btnManageReservations.addEventListener("click", () => {
      isManaging = !isManaging;
      if (isManaging) {
        btnManageReservations.textContent = "Finalizar Gestión";
        btnManageReservations.classList.remove("bg-blue-600", "hover:bg-blue-700");
        btnManageReservations.classList.add("bg-slate-600", "hover:bg-slate-700");
      } else {
        btnManageReservations.textContent = "Gestionar Reservas";
        btnManageReservations.classList.remove("bg-slate-600", "hover:bg-slate-700");
        btnManageReservations.classList.add("bg-blue-600", "hover:bg-blue-700");
      }
      loadReservations();
    });
  }

  // Submit del formulario de CREACIÓN
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const workspace = form.workspace.value;
      const date = form.date.value;
      const startHour = form.startHour.value;
      const endHour = form.endHour.value;
      const reason = form.reason.value.trim();

      if (!workspace || !date || !startHour || !endHour || !reason) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
      }
      if (startHour >= endHour) {
        alert("La hora de fin debe ser posterior a la hora de inicio.");
        return;
      }

      // Validar traslape/superposición de horarios
      try {
        const allReservations = await getReservations();
        const hasOverlap = allReservations.some((r) => {
          // No confrontar con reservas rechazadas o canceladas
          if (r.status === "cancelled" || r.status === "rejected") return false;
          // Debe ser el mismo espacio en la misma fecha
          if (r.workspace !== workspace || r.date !== date) return false;
          // Validar traslape: startA < endB && startB < endA
          return startHour < r.endHour && r.startHour < endHour;
        });

        if (hasOverlap) {
          alert("El espacio ya se encuentra reservado en el horario seleccionado.");
          return;
        }
      } catch (error) {
        console.error("Error al validar traslape de horario:", error);
      }

      let newId = 1;
      try {
        const allReservations = await getReservations();
        if (allReservations && allReservations.length > 0) {
          const ids = allReservations.map((r) => Number(r.id)).filter((id) => !isNaN(id));
          if (ids.length > 0) newId = Math.max(...ids) + 1;
        }
      } catch (error) {
        console.error("Error al calcular el ID consecutivo:", error);
        newId = Date.now();
      }

      const newReservationData = {
        id: newId,
        userId: user.id,
        workspace,
        date,
        startHour,
        endHour,
        reason,
        status: "pending"
      };

      try {
        const response = await createReservations(newReservationData);
        if (response && response.ok) {
          alert("Reserva creada con éxito.");
          closeModal();
          await loadReservations();
        } else {
          alert("Hubo un problema al registrar la reserva.");
        }
      } catch (error) {
        console.error("Error al enviar la reserva:", error);
        alert("Error de conexión con el servidor.");
      }
    });
  }

  // =============================================
  // HELPERS: Abrir / Cerrar modal de edición
  // =============================================
  const editModal = document.querySelector("#editReservationModal");
  const editModalPanel = document.querySelector("#editReservationModalPanel");
  const closeEditModalBtn = document.querySelector("#closeEditModalBtn");
  const cancelEditModalBtn = document.querySelector("#cancelEditModalBtn");
  const editForm = document.querySelector("#editReservationForm");

  const openEditModal = (reservation) => {
    if (!editModal) return;
    // Pre-llenar los campos con los datos existentes
    document.querySelector("#editReservationId").value = reservation.id;
    document.querySelector("#editWorkspace").value = reservation.workspace;
    document.querySelector("#editDate").value = reservation.date;
    document.querySelector("#editStartHour").value = reservation.startHour;
    document.querySelector("#editEndHour").value = reservation.endHour;
    document.querySelector("#editReason").value = reservation.reason;
    // El estado no se edita: se guarda en un atributo del formulario para preservarlo
    editForm.dataset.currentStatus = reservation.status;

    editModal.classList.remove("pointer-events-none", "opacity-0");
    editModal.classList.add("pointer-events-auto", "opacity-100");
    if (editModalPanel) {
      editModalPanel.classList.remove("scale-95");
      editModalPanel.classList.add("scale-100");
    }
  };

  const closeEditModal = () => {
    if (!editModal) return;
    editModal.classList.remove("pointer-events-auto", "opacity-100");
    editModal.classList.add("pointer-events-none", "opacity-0");
    if (editModalPanel) {
      editModalPanel.classList.remove("scale-100");
      editModalPanel.classList.add("scale-95");
    }
    if (editForm) editForm.reset();
  };

  if (closeEditModalBtn) closeEditModalBtn.addEventListener("click", closeEditModal);
  if (cancelEditModalBtn) cancelEditModalBtn.addEventListener("click", closeEditModal);
  if (editModal) {
    editModal.addEventListener("click", (e) => {
      if (editModalPanel && !editModalPanel.contains(e.target)) closeEditModal();
    });
  }

  // Submit del formulario de EDICIÓN
  if (editForm) {
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = editForm.id.value;
      const workspace = editForm.workspace.value;
      const date = editForm.date.value;
      const startHour = editForm.startHour.value;
      const endHour = editForm.endHour.value;
      const reason = editForm.reason.value.trim();
      const status = editForm.dataset.currentStatus; // Preservar el estado original

      if (!workspace || !date || !startHour || !endHour || !reason) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
      }
      if (startHour >= endHour) {
        alert("La hora de fin debe ser posterior a la hora de inicio.");
        return;
      }

      // Validar traslape/superposición de horarios
      try {
        const allReservations = await getReservations();
        const hasOverlap = allReservations.some((r) => {
          // No confrontar con la misma reserva que se está editando
          if (String(r.id) === String(id)) return false;
          // No confrontar con reservas rechazadas o canceladas
          if (r.status === "cancelled" || r.status === "rejected") return false;
          // Debe ser el mismo espacio en la misma fecha
          if (r.workspace !== workspace || r.date !== date) return false;
          // Validar traslape: startA < endB && startB < endA
          return startHour < r.endHour && r.startHour < endHour;
        });

        if (hasOverlap) {
          alert("El espacio ya se encuentra reservado en el horario seleccionado.");
          return;
        }
      } catch (error) {
        console.error("Error al validar traslape de horario:", error);
      }

      // Buscar la reserva original para preservar el tipo de ID y userId exactos
      let finalId = id;
      let finalUserId = user.id;
      try {
        const allReservations = await getReservations();
        const original = allReservations.find((r) => String(r.id) === String(id));
        if (original) {
          finalId = original.id;
          finalUserId = original.userId;
        }
      } catch (err) {
        console.error("Error al obtener la reserva original:", err);
      }

      const updatedData = { id: finalId, userId: finalUserId, workspace, date, startHour, endHour, reason, status };

      try {
        const response = await updateReservation(id, updatedData);
        if (response && response.ok) {
          alert("Reserva actualizada con éxito.");
          closeEditModal();
          await loadReservations();
        } else {
          const errorText = response ? await response.text() : "Sin respuesta";
          console.error("Error response from server on edit:", response?.status, errorText);
          alert(`Hubo un problema al actualizar la reserva: ${errorText}`);
        }
      } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        alert("Error de conexión con el servidor.");
      }
    });
  }

  // =============================================
  // DELEGACIÓN DE EVENTOS: Editar y Eliminar
  // =============================================
  function setupCardActions() {
    // Eliminar
    container.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmed = confirm("¿Estás seguro de que deseas eliminar esta reserva?");
        if (!confirmed) return;

        try {
          const response = await deleteReservation(id);
          if (response && response.ok) {
            alert("Reserva eliminada.");
            await loadReservations();
          } else {
            alert("Hubo un problema al eliminar la reserva.");
          }
        } catch (error) {
          console.error("Error al eliminar la reserva:", error);
          alert("Error de conexión con el servidor.");
        }
      });
    });

    // Cancelar
    container.querySelectorAll(".btn-cancel").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmed = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
        if (!confirmed) return;

        try {
          const allReservations = await getReservations();
          const reservation = allReservations.find((r) => String(r.id) === String(id));
          if (!reservation) {
            alert("No se encontró la reserva.");
            return;
          }

          if (reservation.status !== "approved") {
            alert("Solo se pueden cancelar reservas que estén aprobadas.");
            return;
          }

          const updatedData = { ...reservation, status: "cancelled" };

          const response = await updateReservation(id, updatedData);
          if (response && response.ok) {
            alert("Reserva cancelada con éxito.");
            await loadReservations();
          } else {
            alert("Hubo un problema al cancelar la reserva.");
          }
        } catch (error) {
          console.error("Error al cancelar la reserva:", error);
          alert("Error de conexión con el servidor.");
        }
      });
    });

    // Editar
    container.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          const allReservations = await getReservations();
          const reservation = allReservations.find((r) => String(r.id) === String(id));
          if (reservation) {
            openEditModal(reservation);
          } else {
            alert("No se encontró la reserva.");
          }
        } catch (error) {
          console.error("Error al cargar la reserva:", error);
          alert("Error de conexión con el servidor.");
        }
      });
    });

    // Cambio de estado inmediato por Admin
    container.querySelectorAll(".select-status-admin").forEach((select) => {
      select.addEventListener("change", async (e) => {
        const id = select.dataset.id;
        const newStatus = select.value;

        try {
          const allReservations = await getReservations();
          const reservation = allReservations.find((r) => String(r.id) === String(id));
          if (!reservation) {
            alert("No se encontró la reserva.");
            return;
          }

          const updatedData = { ...reservation, status: newStatus };

          const response = await updateReservation(id, updatedData);
          if (response && response.ok) {
            await loadReservations();
          } else {
            const errorText = response ? await response.text() : "Sin respuesta";
            console.error("Error status update:", response?.status, errorText);
            alert(`Hubo un problema al cambiar el estado de la reserva: ${errorText}`);
            await loadReservations();
          }
        } catch (error) {
          console.error("Error al actualizar el estado de la reserva:", error);
          alert("Error de conexión con el servidor.");
          await loadReservations();
        }
      });
    });
  }
};
