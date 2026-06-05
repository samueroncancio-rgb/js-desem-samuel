export default function ReservationCard(reservation, isAdminManaging = false) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;

  const statusConfig = {
    approved:  { label: 'Aprobado',  classes: 'bg-green-50 text-green-700 border border-green-100' },
    rejected:  { label: 'Rechazado', classes: 'bg-red-50 text-red-700 border border-red-100' },
    cancelled: { label: 'Cancelado', classes: 'bg-slate-100 text-slate-500 border border-slate-200' },
    pending:   { label: 'Pendiente', classes: 'bg-amber-50 text-amber-700 border border-amber-100' },
  };

  const { label, classes } = statusConfig[status] ?? statusConfig.pending;

  return `
    <article
      class="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 relative group"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg text-slate-800">
          ${workspace}
        </h3>
        <div class="flex gap-1.5 flex-wrap justify-end">
          ${status === 'pending' ? `
          <button
            data-id="${id}"
            class="btn-cancel text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Cancelar
          </button>
          ` : ''}
          <button
            data-id="${id}"
            class="btn-edit text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Editar
          </button>
          <button
            data-id="${id}"
            class="btn-delete text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div class="mt-2 text-sm text-slate-600 space-y-1">

        <p>
          <span class="font-medium text-slate-400">Fecha:</span>
          ${date}
        </p>

        <p>
          <span class="font-medium text-slate-400">Horario:</span>
          ${startHour} - ${endHour}
        </p>

        <p>
          <span class="font-medium text-slate-400">Motivo:</span>
          ${reason}
        </p>

        <div class="flex items-center gap-2">
          <span class="font-medium text-slate-400">Estado:</span>
          ${isAdminManaging ? `
            <select
              data-id="${id}"
              class="select-status-admin bg-white border border-slate-200 rounded px-2.5 py-0.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pendiente</option>
              <option value="approved" ${status === 'approved' ? 'selected' : ''}>Aprobado</option>
              <option value="rejected" ${status === 'rejected' ? 'selected' : ''}>Rechazado</option>
              <option value="cancelled" ${status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
            </select>
          ` : `
            <span class="font-semibold px-2 py-0.5 rounded text-xs ${classes}">
              ${label}
            </span>
          `}
        </div>

      </div>
    </article>
  `;
}
