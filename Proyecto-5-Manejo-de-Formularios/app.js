document
  .getElementById("registroEvento")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Variables
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const intereses = document.querySelectorAll(
      'input[name="intereses"]:checked'
    );
    const horario = document.querySelector('input[name="horario"]:checked');

    // Validaciones básicas
    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    } 

    // Aqui se valida que el nombre no tenga numeros
    if (/\d/.test(nombre)) {
      alert("El nombre no puede incluir numeros.");
      return;
    }

    // Aqui se evita que el numero telefonico no contenga letras
    if (/[a-zA-Z]/.test(telefono)) {
      alert("El numero telefonico no puede tener letras.");
      return;
    }

    // Aqui se valida que el correo tenga un formato valido como usuario@domminio.com
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {
      alert("El correo no es válido. Asegúrate de incluir un dominio.");
      return;
    }

    // Si todo está bien
    alert("Registro exitoso. ¡Gracias por registrarte!");
  });
