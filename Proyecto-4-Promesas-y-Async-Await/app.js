
// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Si hay suficientes mesas disponibles se resuelve la promesa de lo contrario se rechaza con un mensaje adecuado.
      if(mesasDisponibles >= mesasSolicitadas){
        console.log("Hay mesas disponibles")
        resolve(true);
      }else{
        reject("No hay mesas disponibles");
      }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const exito = Math.random() > 0.3;
      if (exito) {
        resolve(`Su reservación a nombre de ${nombreCliente} ha sido confirmada.`);
      } else {
        reject(`Error al enviar la confirmación para ${nombreCliente}. Intente nuevamente.`);
      }
    }, 1500);
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación y espera la respuesta
    
    if(disponibilidad){
        const mensaje = await enviarConfirmacionReserva(nombreCliente);
        console.log(mensaje);
    }
  } catch (error) {
    console.log("Error:", error.message || error);  // Maneja los errores en la promesa
  }
}

hacerReserva("Emiliano Osuna", 3);