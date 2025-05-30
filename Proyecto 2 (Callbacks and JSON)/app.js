
// Objeto que representa la biblioteca, con una lista inicial de libros
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// En esta funcion se simula la lectura de datos de la biblioteca después de 1 segundo y se llama al callback pasándole el objeto `biblioteca`

function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

// Con esta funcion se muestran en consola todos los libros de la biblioteca se utiliza `leerDatos` para obtener los libros y su indice simulando un acceso asíncrono
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// En esta funcion se agrega un nuevo libro a la biblioteca después de 3 segundos

function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
        biblioteca.libros.push(nuevoLibro);
        console.log('Libro agregado con exito')
    }, 3000);
}

// En esta funcion se actualiza la disponibilidad de un libro según su título se ejecuta después de 5 segundos
function actualizarDisponibilidad(titulo, nuevoEstado) {
    setTimeout(() => {
        const libro = biblioteca.libros.find(libro => libro.titulo ===titulo);
        if(libro){
            libro.disponible = nuevoEstado;
            console.log(`El libro con titulo ${titulo} ha sido actualizado a: ${nuevoEstado}.`);

        }else{
            console.log(`El libro con titulo ${titulo} no esta disponible.`)
        }
    }, 5000);
}

mostrarLibros();
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
actualizarDisponibilidad("1984", false);
actualizarDisponibilidad("100 años de soledad", false);