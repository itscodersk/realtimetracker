const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    console.log("A user connected:", socket.id); // Log the socket connection

    socket.on("send-location", function (data) {
        console.log("Location received from", socket.id, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        console.log("User disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
