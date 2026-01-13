const http = require("http");
const { Server } = require("socket.io");

const chatHandler = require("./socket/chatHandler");

const server = http.createServer();

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  chatHandler(io, socket);
});

server.listen(5000, () => {
  console.log("Socket.IO server running on port 5000");
});
