import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./Actions.js";
import path from "path";

const __dirname = path.resolve();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("dist"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const userSocketMap = {};
const codeRoomMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  // console.log("socket id:", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    // console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    codeRoomMap[roomId] = code;
    // console.log(codeRoomMap[roomId]);
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
      code,
    });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ roomId, socketId }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
      code: codeRoomMap[roomId],
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server is listening on PORT:${PORT}`);
});
