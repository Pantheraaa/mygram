const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html");
})

const server = app.listen(8000, () => {
    console.log(`App is running on port ${8000}`);
})

const io = socketio(server);
io.on("connection", (socket) => {
    console.log("Connected to socket IO...")

    socket.on("message", (msg) => {
        // broadcast message to all clients except the sender
        socket.broadcast.emit("receiveMessage", msg);
    })
});