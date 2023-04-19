const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const formValues = {
        email: signupForm.email.value,
        password: signupForm.password.value
    };
    const response = await fetch("http://localhost:8080/api/sessions/signup", {
        method: "POST",
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(formValues)
    });
    const data = await response.json();
    localStorage.setItem("token", data.accessToken);


    const res = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: {
            'Content-type':'application/json',
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
     /// ?

    

})


const socket = io();

let username;

//productos
const listado = document.getElementById("listado");
socket.on("lista-productos", (data) => {
    listado.innerHTML = "";
    data.forEach(prod => {
        let li = document.createElement("li");
        li.innerHTML = `ID:${prod._id} - Titulo:${prod.title} - Precio:${prod.price} - Stock: ${prod.stock} - Code: ${prod.code}`;
        listado.append(li);
    });
})

//chat
Swal.fire({
    title: 'Identifícate',
    input: "text",
    text: "Ingresa tu email",
    inputValidator: (value) => {
        return !value && "Es obligatorio introducir un email";
    },
    allowOutsideClick: false
}).then((result) => {
    username = result.value;
    socket.emit("new-user", username);
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const inputMessage = chatInput.value;
        if (inputMessage.trim().length > 0) {
            socket.emit("chat-message", { user: username, message: inputMessage });
            chatInput.value = "";
        }
    }
});

const messagesPanel = document.getElementById("messages");
socket.on("messages", (data) => {
    let messages = "";
    data.forEach((m) => {
        messages += `<br><b>${m.user}:</b> ${m.message}`;
    });
    messagesPanel.innerHTML = messages;
})

socket.on("new-user", (username) => {
    Swal.fire({
        title: `${username} se ha unido al chat!`,
        toast: true,
        position: "top-end"
    });
})

