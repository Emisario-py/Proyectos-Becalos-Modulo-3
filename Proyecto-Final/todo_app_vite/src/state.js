import axios from 'axios'
/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "http://localhost:3005/api";


export const getTodos = async () => {

    try {
        const todos = await axios.get(`${BASE_URL_API}/todos`)
        console.log("llamada axios", todos)
        return todos.data;
    } catch (err) {
        console.log("Error al obtener los TODOs:", err);
        return []
    }
}

/* export const todos = getTodos() */
//todos();
/* console.log(todos) */

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {
    //const todos = getTodos()

    /* todos.push({ ...item, done: false });
    persist(); */
    try {
        const response = await axios.post(`${BASE_URL_API}/todos`, { ...item, done: 0 })
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

export async function toggleDone(id, currentDone) {
    const newDone = currentDone === 1 ? 0 : 1;
    try {
        const response = await axios.patch(`${BASE_URL_API}/todos/${id}`, { done: newDone });
        return response.data; // debería devolver { id, done: newDone }
    } catch (err) {
        console.log("Error al cambiar el estado de 'done':", err);
        return {};
    }
}

export async function removeTodo(item) {
    //const todos = getTodos()
    try {
        const response = await axios.delete(`${BASE_URL_API}/todos/${item}`)
        return response.data;
    } catch (err) {
        console.log("Error al crear el TODO :", err);
        return {}
    }
}

/* function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
} */

export async function post(user){
    try {
        const response = await axios.post(`${BASE_URL_API}/user`, user)
        return response.data;
    } catch (err) {
        console.log("Error al crear el usuario :", err);
        return {}
    }
}
