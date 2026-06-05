(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{localStorage.setItem(`user`,JSON.stringify(e))},t=()=>JSON.parse(localStorage.getItem(`user`)),n=()=>{localStorage.removeItem(`user`)},r=()=>!!t(),i=`http://localhost:3000/users`;async function a(){try{let e=await fetch(i);if(!e.ok)throw Error(`Error fetching users`);return await e.json()}catch(e){return console.error(e),[]}}async function o(e){try{let t=await fetch(i,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`Error registering user`);return await t.json()}catch(e){throw console.error(e),e}}var s=()=>{let t=document.querySelector(`#loginForm`);t.addEventListener(`submit`,async n=>{n.preventDefault();let r=t.email.value.trim(),i=t.password.value.trim();try{let t=(await a()).find(e=>e.email===r&&e.password===i);if(!t){alert(`Credenciales incorrectas`);return}e({id:t.id,name:t.name,role:t.role}),C(`/home`)}catch(e){console.error(e),alert(`Error conectando con la API`)}});let n=document.querySelector(`#toRegisterBtn`);n&&n.addEventListener(`click`,()=>{C(`/register`)})};function c(){return setTimeout(()=>{s()}),`
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-5">
          Login
        </h1>

        <form id="loginForm">

          <input
            type="email"
            name="email"
            placeholder="Correo"
            class="border w-full p-2 rounded mb-3"
          >

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            class="border w-full p-2 rounded mb-4"
          >

          <button
            class="bg-blue-600 text-white w-full py-2 rounded cursor-pointer"
          >
            Ingresar
          </button>

          <button
            id="toRegisterBtn"
            type="button"
            class="bg-blue-600 text-white w-full py-2 rounded mt-3 cursor-pointer"
          >
            Registrar
          </button>

        </form>

      </div>

    </div>
  `}function l(){return setTimeout(()=>{document.querySelector(`#logoutBtn`)?.addEventListener(`click`,()=>{n(),C(`/`)})}),`
    <aside
      class="w-64 bg-slate-900 text-white min-h-screen p-5 "
    >
      <h2 class="text-2xl font-bold mb-8">
        SPA Base
      </h2>

      <nav class="flex flex-col gap-4">

        <a href="/home" class="px-3 py-1 bg-gray-500 rounded-xl" data-link>
          Home
        </a>

        <button
          id="logoutBtn"
          class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-400 px-3 py-1 rounded-xl"
        >
          Cerrar sesión
        </button>

      </nav>

    </aside>
  `}function u(e,t=!1){let{id:n,workspace:r,date:i,startHour:a,endHour:o,reason:s,status:c}=e,l={approved:{label:`Aprobado`,classes:`bg-green-50 text-green-700 border border-green-100`},rejected:{label:`Rechazado`,classes:`bg-red-50 text-red-700 border border-red-100`},cancelled:{label:`Cancelado`,classes:`bg-slate-100 text-slate-500 border border-slate-200`},pending:{label:`Pendiente`,classes:`bg-amber-50 text-amber-700 border border-amber-100`}},{label:u,classes:d}=l[c]??l.pending;return`
    <article
      class="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 relative group"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg text-slate-800">
          ${r}
        </h3>
        <div class="flex gap-1.5 flex-wrap justify-end">
          ${c===`pending`?`
          <button
            data-id="${n}"
            class="btn-cancel text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Cancelar
          </button>
          `:``}
          <button
            data-id="${n}"
            class="btn-edit text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Editar
          </button>
          <button
            data-id="${n}"
            class="btn-delete text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div class="mt-2 text-sm text-slate-600 space-y-1">

        <p>
          <span class="font-medium text-slate-400">Fecha:</span>
          ${i}
        </p>

        <p>
          <span class="font-medium text-slate-400">Horario:</span>
          ${a} - ${o}
        </p>

        <p>
          <span class="font-medium text-slate-400">Motivo:</span>
          ${s}
        </p>

        <div class="flex items-center gap-2">
          <span class="font-medium text-slate-400">Estado:</span>
          ${t?`
            <select
              data-id="${n}"
              class="select-status-admin bg-white border border-slate-200 rounded px-2.5 py-0.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="pending" ${c===`pending`?`selected`:``}>Pendiente</option>
              <option value="approved" ${c===`approved`?`selected`:``}>Aprobado</option>
              <option value="rejected" ${c===`rejected`?`selected`:``}>Rechazado</option>
              <option value="cancelled" ${c===`cancelled`?`selected`:``}>Cancelado</option>
            </select>
          `:`
            <span class="font-semibold px-2 py-0.5 rounded text-xs ${d}">
              ${u}
            </span>
          `}
        </div>

      </div>
    </article>
  `}var d=`http://localhost:3000/reservations`;async function f(e){try{let t=e?`${d}?userId=${e}`:d,n=await fetch(t);if(!n.ok)throw Error(`Error fetching tasks`);return await n.json()}catch(e){return console.error(e),[]}}async function p(e){try{return await fetch(d,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify(e)})}catch(e){return console.error(e),null}}async function m(e,t){try{return await fetch(`${d}/${e}`,{method:`PUT`,headers:{"content-type":`application/json`},body:JSON.stringify(t)})}catch(e){return console.error(e),null}}async function h(e){try{return await fetch(`${d}/${e}`,{method:`DELETE`})}catch(e){return console.error(e),null}}var g=async()=>{let e=document.querySelector(`#reservationsContainer`),n=t(),r=!1;async function i(){let t=n.role===`admin`?await f():await f(n.id);e.innerHTML=t.length?t.map(e=>u(e,r)).join(``):`
        <div class="w-full text-center py-8 col-span-2">
          <p class="text-slate-500">No hay reservas disponibles</p>
        </div>
      `,E()}await i();let a=document.querySelector(`#reservationModal`),o=document.querySelector(`#reservationModalPanel`),s=document.querySelector(`#btnNewReservation`),c=document.querySelector(`#closeModalBtn`),l=document.querySelector(`#cancelModalBtn`),d=document.querySelector(`#reservationForm`),g=()=>{if(!a)return;a.classList.remove(`pointer-events-none`,`opacity-0`),a.classList.add(`pointer-events-auto`,`opacity-100`),o&&(o.classList.remove(`scale-95`),o.classList.add(`scale-100`));let e=document.querySelector(`#date`);e&&(e.min=new Date().toISOString().split(`T`)[0])},_=()=>{a&&(a.classList.remove(`pointer-events-auto`,`opacity-100`),a.classList.add(`pointer-events-none`,`opacity-0`),o&&(o.classList.remove(`scale-100`),o.classList.add(`scale-95`)),d&&d.reset())};s&&s.addEventListener(`click`,g),c&&c.addEventListener(`click`,_),l&&l.addEventListener(`click`,_),a&&a.addEventListener(`click`,e=>{o&&!o.contains(e.target)&&_()});let v=document.querySelector(`#btnManageReservations`);v&&v.addEventListener(`click`,()=>{r=!r,r?(v.textContent=`Finalizar Gestión`,v.classList.remove(`bg-blue-600`,`hover:bg-blue-700`),v.classList.add(`bg-slate-600`,`hover:bg-slate-700`)):(v.textContent=`Gestionar Reservas`,v.classList.remove(`bg-slate-600`,`hover:bg-slate-700`),v.classList.add(`bg-blue-600`,`hover:bg-blue-700`)),i()}),d&&d.addEventListener(`submit`,async e=>{e.preventDefault();let t=d.workspace.value,r=d.date.value,a=d.startHour.value,o=d.endHour.value,s=d.reason.value.trim();if(!t||!r||!a||!o||!s){alert(`Por favor, completa todos los campos del formulario.`);return}if(a>=o){alert(`La hora de fin debe ser posterior a la hora de inicio.`);return}let c=1;try{let e=await f();if(e&&e.length>0){let t=e.map(e=>Number(e.id)).filter(e=>!isNaN(e));t.length>0&&(c=Math.max(...t)+1)}}catch(e){console.error(`Error al calcular el ID consecutivo:`,e),c=Date.now()}let l={id:c,userId:n.id,workspace:t,date:r,startHour:a,endHour:o,reason:s,status:`pending`};try{let e=await p(l);e&&e.ok?(alert(`Reserva creada con éxito.`),_(),await i()):alert(`Hubo un problema al registrar la reserva.`)}catch(e){console.error(`Error al enviar la reserva:`,e),alert(`Error de conexión con el servidor.`)}});let y=document.querySelector(`#editReservationModal`),b=document.querySelector(`#editReservationModalPanel`),x=document.querySelector(`#closeEditModalBtn`),S=document.querySelector(`#cancelEditModalBtn`),C=document.querySelector(`#editReservationForm`),w=e=>{y&&(document.querySelector(`#editReservationId`).value=e.id,document.querySelector(`#editWorkspace`).value=e.workspace,document.querySelector(`#editDate`).value=e.date,document.querySelector(`#editStartHour`).value=e.startHour,document.querySelector(`#editEndHour`).value=e.endHour,document.querySelector(`#editReason`).value=e.reason,C.dataset.currentStatus=e.status,y.classList.remove(`pointer-events-none`,`opacity-0`),y.classList.add(`pointer-events-auto`,`opacity-100`),b&&(b.classList.remove(`scale-95`),b.classList.add(`scale-100`)))},T=()=>{y&&(y.classList.remove(`pointer-events-auto`,`opacity-100`),y.classList.add(`pointer-events-none`,`opacity-0`),b&&(b.classList.remove(`scale-100`),b.classList.add(`scale-95`)),C&&C.reset())};x&&x.addEventListener(`click`,T),S&&S.addEventListener(`click`,T),y&&y.addEventListener(`click`,e=>{b&&!b.contains(e.target)&&T()}),C&&C.addEventListener(`submit`,async e=>{e.preventDefault();let t=C.id.value,r=C.workspace.value,a=C.date.value,o=C.startHour.value,s=C.endHour.value,c=C.reason.value.trim(),l=C.dataset.currentStatus;if(!r||!a||!o||!s||!c){alert(`Por favor, completa todos los campos del formulario.`);return}if(o>=s){alert(`La hora de fin debe ser posterior a la hora de inicio.`);return}let u=t,d=n.id;try{let e=(await f()).find(e=>String(e.id)===String(t));e&&(u=e.id,d=e.userId)}catch(e){console.error(`Error al obtener la reserva original:`,e)}let p={id:u,userId:d,workspace:r,date:a,startHour:o,endHour:s,reason:c,status:l};try{let e=await m(t,p);if(e&&e.ok)alert(`Reserva actualizada con éxito.`),T(),await i();else{let t=e?await e.text():`Sin respuesta`;console.error(`Error response from server on edit:`,e?.status,t),alert(`Hubo un problema al actualizar la reserva: ${t}`)}}catch(e){console.error(`Error al actualizar la reserva:`,e),alert(`Error de conexión con el servidor.`)}});function E(){e.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.id;if(confirm(`¿Estás seguro de que deseas eliminar esta reserva?`))try{let e=await h(t);e&&e.ok?(alert(`Reserva eliminada.`),await i()):alert(`Hubo un problema al eliminar la reserva.`)}catch(e){console.error(`Error al eliminar la reserva:`,e),alert(`Error de conexión con el servidor.`)}})}),e.querySelectorAll(`.btn-cancel`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.id;if(confirm(`¿Estás seguro de que deseas cancelar esta reserva?`))try{let e=(await f()).find(e=>String(e.id)===String(t));if(!e){alert(`No se encontró la reserva.`);return}let n=await m(t,{...e,status:`cancelled`});n&&n.ok?(alert(`Reserva cancelada con éxito.`),await i()):alert(`Hubo un problema al cancelar la reserva.`)}catch(e){console.error(`Error al cancelar la reserva:`,e),alert(`Error de conexión con el servidor.`)}})}),e.querySelectorAll(`.btn-edit`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.id;try{let e=(await f()).find(e=>String(e.id)===String(t));e?w(e):alert(`No se encontró la reserva.`)}catch(e){console.error(`Error al cargar la reserva:`,e),alert(`Error de conexión con el servidor.`)}})}),e.querySelectorAll(`.select-status-admin`).forEach(e=>{e.addEventListener(`change`,async t=>{let n=e.dataset.id,r=e.value;try{let e=(await f()).find(e=>String(e.id)===String(n));if(!e){alert(`No se encontró la reserva.`);return}let t=await m(n,{...e,status:r});if(t&&t.ok)await i();else{let e=t?await t.text():`Sin respuesta`;console.error(`Error status update:`,t?.status,e),alert(`Hubo un problema al cambiar el estado de la reserva: ${e}`),await i()}}catch(e){console.error(`Error al actualizar el estado de la reserva:`,e),alert(`Error de conexión con el servidor.`),await i()}})})}};function _(){let e=t();return setTimeout(()=>{g()}),`
    <div class="flex">

      ${l()}

      <main class="flex-1 p-6 bg-slate-100 min-h-screen">

        <div class="mb-6">

          <h1 class="text-3xl font-bold">
            Bienvenido ${e?.name}
          </h1>

          <p class="text-slate-500">
            Rol: ${e?.role}
          </p>

        </div>

        ${e?.role===`admin`?`
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
            `:`
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
              `}

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
              ${e?.role===`admin`?`Mostrando todas las reservas`:`Mostrando únicamente tus reservas`}
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
  `}var v=()=>{let e=document.querySelector(`#registerForm`),t=document.querySelector(`#toLoginBtn`);t&&t.addEventListener(`click`,()=>{C(`/`)}),e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=e.name.value.trim(),r=e.email.value.trim(),i=e.password.value.trim(),s=e.confirmPassword.value.trim(),c=e.role.value.trim();if(!n||!r||!i||!s||!c){alert(`Todos los campos son obligatorios`);return}if(i!==s){alert(`Las contraseñas no coinciden`);return}if(i.length<6){alert(`La contraseña debe tener al menos 6 caracteres`);return}try{if((await a()).some(e=>e.email.toLowerCase()===r.toLowerCase())){alert(`El correo electrónico ya está registrado`);return}await o({name:n,email:r,password:i,role:c}),alert(`Usuario registrado exitosamente`),C(`/`)}catch(e){console.error(e),alert(`Error al registrar el usuario`)}})};function y(){return setTimeout(()=>{v()}),`
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
  `}function b(){return`
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">

      <h1 class="text-8xl font-bold text-slate-800">
        404
      </h1>

      <h2 class="text-2xl font-semibold text-slate-700 mt-4">
        Página no encontrada
      </h2>

      <p class="text-slate-500 mt-2 text-center max-w-md">
        La ruta que intentas visitar no existe o fue movida.
      </p>

      <button
        id="goHome"
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Volver al inicio
      </button>

    </div>
  `}var x={"/":{render:c,requiresAuth:!1,redirectIfAuthenticated:!0},"/home":{render:_,requiresAuth:!0},"/register":{render:y,requiresAuth:!1,redirectIfAuthenticated:!0}},S=b,C=e=>{history.pushState({},``,e),w()},w=()=>{let e=document.querySelector(`#app`),t=x[window.location.pathname];if(!t){e.innerHTML=S();let t=document.querySelector(`#goHome`);t&&t.addEventListener(`click`,()=>{C(r()?`/home`:`/`)});return}t.requiresAuth&&!r()?(history.replaceState({},``,`/`),t=x[`/`]):t.redirectIfAuthenticated&&r()&&(history.replaceState({},``,`/home`),t=x[`/home`]),e.innerHTML=t.render()};window.addEventListener(`popstate`,w),document.addEventListener(`DOMContentLoaded`,()=>{w()});