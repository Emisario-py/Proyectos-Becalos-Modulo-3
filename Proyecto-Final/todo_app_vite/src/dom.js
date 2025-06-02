/* Este MODULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */
import { getTodos, toggleDone, removeTodo } from "./state.js";

/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}) {
  // limpia estados previos
  [...form.elements].forEach((el) => {
    if (!el.name) return;
    el.classList.remove("is-invalid", "is-valid");
    const feedback =
      el.closest(".input-group")?.querySelector(".invalid-feedback") ??
      el.nextElementSibling;
    if (feedback) {
      feedback.textContent = "";
      feedback.classList.remove("d-block");
    }
  });
  //

  // muestra nuevos
  Object.entries(errors).forEach(([name, msgs]) => {
    const input = form.elements[name];
    if (!input) return;
    input.classList.add("is-invalid");
    input.nextElementSibling.textContent = msgs[0];
    input.nextElementSibling.classList.add("d-block");
  });

  // green cuando todo ok
  if (!Object.keys(errors).length) {
    [...form.elements]
      .filter((el) => el.name)
      .forEach((el) => el.classList.add("is-valid"));
  }
}

export function renderRegisterOutput(pre, dataObj) {
  pre.textContent = JSON.stringify(dataObj, null, 2);
}

export async function renderTodoList(ul) {
  ul.replaceChildren(); // limpia

  const todos = await getTodos();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const doneClass = todo.done === 1 ? "btn-success" : "btn-outline-secondary";

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    if (todo.done) li.classList.add("done");

    li.innerHTML = `
      <span>${todo.task} <small class="badge rounded-pill bg-light text-danger border border-danger ms-2">${todo.dueDate}</small></span>
      <div>
        <button class="btn btn-sm ${doneClass} me-2" data-action="toggle" data-id="${todo.id}" data-done="${todo.done}">
            <i class="bi bi-check"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${todo.id}">
            <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    ul.appendChild(li);
  });
}

/* ---------- evento delegación para lista ---------- */
export function setupTodoActions(ul, onChange) {
  ul.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");

    if (!btn) return;

    const { action, id } = btn.dataset;
    if (action === "toggle") {
      const done = parseInt(btn.dataset.done, 10); // convierte el valor actual
      const result = await toggleDone(id, done); // le pasas id y done

      if (result) {
        // actualiza el estado visualmente si no quieres volver a renderizar
        if (result) {
          btn.setAttribute("data-done", result.done);

          // Cambia clases del botón
          btn.classList.remove("btn-success", "btn-outline-secondary");
          if (result.done === 1) {
            btn.classList.add("btn-success");
          } else {
            btn.classList.add("btn-outline-secondary");
          }
        }
      }
    }

    if (action === "delete") {
      await removeTodo(id);
    }

    onChange(); // vuelve a renderizar la lista
  });
}
