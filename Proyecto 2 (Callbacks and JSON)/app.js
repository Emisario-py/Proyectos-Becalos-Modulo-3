
// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
        biblioteca.libros.push(nuevoLibro);
        console.log('Libro agregado con exito')
    }, 3000);
}

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