require('dotenv').config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const db = require("../src/database/db");
const authroutes = require("../src/routes/auth-routes");

// 1. Create express app
const app = express();

// 2. CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// 3. Body parser
app.use(express.json());

// 4. Connect MongoDB
db.connection();

// 5. Serve public folder (frontend)
app.use(express.static(path.join(__dirname, "public")));

// 6. Use authentication routes
app.use("/chatapp", authroutes);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});


// 7. Create HTTP server (Express + Socket)
const server = http.createServer(app);

// 8. Create Socket.io server with CORS
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 9. Users Set (online users)
const users = new Set();

// 10. Socket logic
io.on("connection", (socket) => {
    //   console.log("A user is now connected");

    //handle users when they will join the chat
    socket.on("join", (userName) => {
        // Only emit userJoined if this is a new user (not a reconnection)
        const isNewUser = !users.has(userName);
        users.add(userName);
        socket.userName = userName;

        //broadcast to all clients/users that a new user has joined (only for new users)
        if (isNewUser) {
            io.emit("userJoined", userName);
        }

        //Send the updated user list to all clients (including the current user)
        io.emit("userList", Array.from(users));
    });

    //handle incoming chat message
    socket.on("chatMessage", (message) => {
        //broadcast the received message to all connected clients
        io.emit("chatMessage", message);
    });

    //handle typing indicator
    socket.on("typing", (data) => {
        //broadcast to all clients except the sender
        socket.broadcast.emit("userTyping", data);
    });

    //handle stop typing indicator
    socket.on("stopTyping", (data) => {
        //broadcast to all clients except the sender
        socket.broadcast.emit("userStopTyping", data);
    });

    //handle user disconnect
    socket.on("disconnect", () => {
        if (socket.userName) {
            const leftUserName = socket.userName;
            users.delete(leftUserName);
            //broadcast to all clients that a user has left
            io.emit("userLeft", leftUserName);
            //Send the updated user list to all clients
            io.emit("userList", Array.from(users));
        }
    });
});

// 11. Run server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server + Socket running at http://localhost:${PORT}`);
});
