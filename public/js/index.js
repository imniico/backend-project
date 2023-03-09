const socket = io();

const listado = document.getElementById("listado");
socket.on("lista-productos", async (data) => {
    listado.innerHTML = "";
    data.forEach(prod => {
        let li = document.createElement("li");
        li.innerHTML = `ID:${prod.id} - Titulo:${prod.title} - Precio:${prod.price} - Stock: ${prod.stock} - Code: ${prod.code}`;
        listado.append(li);
    });
})