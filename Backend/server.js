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
const postQuestion = require("./routes/postQuestion");
const postAnswer = require("./routes/postAnswer");
const postComment = require("./routes/postComment");
const postUpVote = require("./routes/postUpVote");
const postCompiler = require("./routes/postCompiler");
const postAnswerVote = require("./routes/postAnswerVote");
const verifyToken = require("./routes/verifyToken");
const getAllQuestions = require("./routes/getQuestions");
const getAllAnswer = require("./routes/getAllUserAnswer");
const Chat = require("./database/Models/chatModel");
const deleteQuestion = require('./routes/deleteQuestion')
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
app.use("/api/verifytoken", verifyToken);
app.use("/api/postQuestion", postQuestion);
app.use("/api/postAnswer", postAnswer);
app.use("/api/postComment", postComment);
app.use("/api/postUpVote", postUpVote);
app.use("/api/postAnswerVote", postAnswerVote);
app.use("/api/postCompiler", postCompiler);

// api/postQuestion
//get Request
app.use("/api/getAllQuestion", getAllQuestions);
app.use("/api/getAllAnswer", getAllAnswer);
app.use("/api/searchuser", searchuser);
app.use("/api/accessChat", accessChat);
app.use("/api/getallchats", getallchats);
app.use("/api/fetchmessages", fetchmessages);
app.use("/api/sendmsg", sendmsg);


// delete request
app.use("/api/deleteQuestion", deleteQuestion);




const server = http.createServer(app);
const userSocketMap = {};
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

  socket.on("setup", (user_id) => {
    console.log("setup");
    socket.join(user_id);
    // let [temp,rooms]=socket.rooms
    // console.log(rooms)
    socket.emit("user joined the room", {
      user_id,
      onlineUsers: socket.onlineUsers,
    });
    socket.broadcast.emit("i am online", user_id);
  });

  socket.on("new message", (message) => {
    console.log("new meesage");
    const chat = message.chat;
    chat.users.forEach((user) => {
      if (message.sender._id === user._id) return;
      socket.to(user._id).emit("message received", message);
    });
  });

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

    socket.on("code-change", ({ roomId, value, output }) => {
      console.log("value", value);
      socket.in(roomId).emit("code-change", { value , output });
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
