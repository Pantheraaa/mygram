const socket = io();

let name;
let textArea = document.querySelector("#textarea");
let messagArea = document.querySelector(".msg__section");

do {
    name = prompt("Please enter your name");
} while (!name);

textArea.addEventListener("keyup", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        sendMessage(e.target.value);
    }
});

const sendMessage = (message) => {
    const msg = {
        user: name,
        message: message.trim(),
    }

    // Append the msg:
    appendMessage(msg, "outgoing__msg");
    textArea.value = "";
    scrollToBottom();

    // Send to server:
    socket.emit("message", msg);
}

const appendMessage = (msg, type) => {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add(type, "msg_box");

    const markup = `
        <p class="name">${msg.user}</p>
        <p class="msg">${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messagArea.appendChild(mainDiv);
}

// Receiving the messages:
socket.on("receiveMessage", (msg) => {
    appendMessage(msg, "incoming__msg");
    scrollToBottom();
});

const scrollToBottom = () => {
    messagArea.scrollTop = messagArea.scrollHeight;
};