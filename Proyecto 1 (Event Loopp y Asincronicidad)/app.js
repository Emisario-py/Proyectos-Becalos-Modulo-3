const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

// Aqui se utiliza un event listener para darle la funcion de agregar y procesar orden al boton de ordenar
addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

// Mediante esta funcion se añaden nuestros pedidos a nuestro html y por ende a nuestra pagina
function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

// En esta funcion se busca actualizar el status de nuestro pedido
function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

async function processOrder(order) {
    // Aqui se crea una promesa y se utiliza un setTimeout para simular la duracion del pedido
    const promesa = new Promise((resolve) => {
        setTimeout(() => resolve('Pedido completado'),  Math.floor(Math.random() * 5000) + 1000);
    })
    // Aqui se actualiza el estado del pedido a "Completado" utilizando una promesa, la idea es que nuevostatus se actualize una vez la promesa se ha completado
    const nuevostatus = await promesa
    updateOrderStatus(order, nuevostatus);
}