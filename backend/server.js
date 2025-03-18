// require("dotenv").config()
// const express = require("express")
// const { sequelize, PersonalTodo } = require("./src/models")
// const PORT = process.env.PORT || 3000
// const cors = require("cors")
// const path = require("path")
// const adminRoutes = require("./src/routes/adminRoutes")
// const routes = require("./src/routes")
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const passport = require('passport');
// const app = express()
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// require('./src/config/passport');

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//     })
// );

// var corsOptions = {
//     origin: [
//         "http://localhost:5173",
//         "http://localhost:4200",
//         "https://projexpert.vercel.app",
//         "https://github.com"
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
// };

// app.use(express.static("./uploads"));
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/api/v1", routes);
// app.use("/api/v1/admin", adminRoutes);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     console.log(err.message);
//     const statusCode = err.status || 500;
//     res.status(statusCode).json({
//         success: false,
//         error: { code: statusCode, message: "Something went wrong!", err },
//     });
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

// app.get("/status", (req, res) => {
//     res.send("Hey Mr., I'm fine...Just chill and Relaxxxxxxxxx.")
// })


// const io = new Server(server, {
//     cors: {
//       origin: ["https://chatter.interactweb.agency", "http://localhost:5173"],
//       methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
//       credentials: true,
//     },
//   });
  
//   io.on("connection", (socket) => {
//     console.log("A user Connected", socket.id);

  
//     socket.on("join", async (data) => {
//       console.log("joining user", data);
//       const { chatRoomId } = data;
//       if (chatRoomId) {
//         socket.join(chatRoomId);
//       }
//     });
  
//     socket.on("privateMessage", (data) => {
//       console.log("sending message to receiver", data);
//       io.to(data.chatRoomId).emit("receiveMessage", {
//         message: data.message,
//         chatRoomId: data.chatRoomId,
//         senderId: data.senderId,
//         attachment: data.attachment,
//       });
//     });
  
//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });
  
//   io.on("error", (err) => {
//     console.error("Socket error:", err);
//   });
  
// console.log("io", io);
// sequelize.sync({ force: false }).then(() => {
//     server.listen(PORT, () => {
//         console.log(`Server is listening at http://localhost:${PORT}`)
//     })
// })




// index.js (backend)
const express = require("express");
const { sequelize } = require("./src/models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./src/routes/adminRoutes");
const routes = require("./src/routes");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
require('./src/config/passport');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(cors({
    origin: ["http://localhost:5173", "https://projexpert.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
}));
app.use(express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", routes);
app.use("/api/v1/admin", adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: { code: err.status || 500, message: "Something went wrong!", err },
    });
});

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://chatter.interactweb.agency","https://projexpert.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    },
    "destroy upgrade": false,
});

const onlineUsers = new Map(); // Map to track online users

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get("/status", (req, res) => {
    res.send("Hey Mr., I'm fine...Just chill and Relaxxxxxxxxx.")
})


io.on("connection", (socket) => {
    console.log("A user Connected", socket.id);

    // User joins a chat room and registers their user ID
    socket.on("join", async (data) => {
        const { chatRoomId, userId } = data;
        if (chatRoomId && userId) {
            socket.join(chatRoomId);
            onlineUsers.set(userId, socket.id); // Track online user
            io.to(chatRoomId).emit("userStatus", { userId, online: true });
        }
    });

    // Typing event
    socket.on("typing", (data) => {
        const { chatRoomId, userId } = data;
        io.to(chatRoomId).emit("typing", { userId, isTyping: true });
    });

    socket.on("stopTyping", (data) => {
        const { chatRoomId, userId } = data;
        io.to(chatRoomId).emit("typing", { userId, isTyping: false });
    });

    // Private message
    socket.on("privateMessage", (data) => {
        io.to(data.chatRoomId).emit("receiveMessage", {
            message: data.message,
            chatRoomId: data.chatRoomId,
            senderId: data.senderId,
            attachment: data.attachment,
        });
    });

    // User disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        const userId = [...onlineUsers.entries()].find(([_, sid]) => sid === socket.id)?.[0];
        if (userId) {
            onlineUsers.delete(userId);
            io.emit("userStatus", { userId, online: false }); // Broadcast to all rooms
        }
    });

    socket.on("leave", (data) => {
        const { chatRoomId, userId } = data;
        if (chatRoomId && userId && onlineUsers.has(userId)) {
            io.to(chatRoomId).emit("userStatus", { userId, online: false });
        }
    });
});

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
});