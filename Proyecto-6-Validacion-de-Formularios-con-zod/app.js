// Importamos Zod
const { z } = window.Zod;

// Esquema para validar los datos del formulario
const registerSchema = z.object({
  // Se valida que el nombre sea una cadena no vacía.
  name: z.string().trim().min(1, "El nombre tiene que ser una cadena no vacia"),
  // Se valida que el correo tenga el formato correcto.
  email: z.string().email("Correo electronico no valido"),
  // Se valida que la contraseña tenga al menos 6 caracteres.
  password: z
    .string()
    .min(6, "La contraseña debe de tener por lo menos 6 caracteres"),
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Capturamos los valores ingresados
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  const errorBox = document.getElementById("errors");

  try {
    // Se valida el esquema.
    registerSchema.parse(formData);
    errorBox.textContent = "";
    errorBox.style.display = "none";
    alert("¡Registro exitoso!");
  } catch (error) {
    // Se muestra los mensajes de error en la página.
    document.getElementById("errors").textContent = error.errors
      .map((e) => e.message)
      .join(", ");
      errorBox.style.display = "block"
  }
});
