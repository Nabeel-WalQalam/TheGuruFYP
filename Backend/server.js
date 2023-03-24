const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Socket } = require("socket.io-client");
const dbConnection = require("./database/connection");

const createuser = require("./routes/createuser");
const loginuser = require("./routes/loginuser");
const getuser = require("./routes/getuser");
const sendmsg = require("./routes/sendmsg");
const fetchmessages = require("./routes/fetchmessages");
const getallchats = require("./routes/getallchats");
const accessChat = require("./routes/accessChat");
const searchuser = require("./routes/searchuser");
const creategroupchat = require("./routes/creategroupchat");
const verifyToken = require("./routes/verifyToken");
const Chat = require("./database/Models/chatModel");
const path = require("path");

dbConnection();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/signup", createuser);
app.use("/api/loginuser", loginuser);

const server = http.createServer(app);
const userSocketMap = {};
const io = new Server(server);

function getAllConnectedClients(roomId) {
  //get  the given room from roomID from all...
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("join", ({ roomId, username }) => {
    //get the username... to room
    // console.log(roomId, username);
    userSocketMap[socket.id] = username;
    //join user in a socket room
    socket.join(roomId);
    //know the other clients that someone come
    const clients = getAllConnectedClients(roomId);
    // console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });

    socket.on("code-change", ({ roomId, value }) => {
      console.log("value", value);
      socket.in(roomId).emit("code-change", { value });
    });

    socket.on("sync-code", ({ socketId, code }) => {
      io.to(socketId).emit("code-change", { code });
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        console.log("a user disconnect");
        io.in(roomId).emit("disconnected", {
          socketId: socket.id,
          // username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
